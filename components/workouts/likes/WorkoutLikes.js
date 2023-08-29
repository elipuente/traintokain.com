import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import LikesDrawer from './LikesDrawer';
import WorkoutLikesSkeleton from './WorkoutLikesSkeleton';

import { HeartIcon, HeartErrorIcon } from '../../../icons';

import { useUser } from '../../../utils/user';
import { fetcher } from '../../../utils/fetcher';
import { getAccessToken } from '../../../utils/token';

const totalLikeText = (userLikedWorkout, likes, matchingUserLike) => {
  if (!likes && userLikedWorkout) {
    return 'You';
  }

  if (userLikedWorkout && matchingUserLike?.length) {
    likes = likes.filter(({ id }) => id !== matchingUserLike[0].id);
  }

  const names = likes.map(({ user }) => `${user.firstName}`);

  switch (userLikedWorkout ? names.length + 1 : names.length) {
    case 1: {
      return userLikedWorkout ? 'You' : names[0];
    }
    case 2: {
      return userLikedWorkout ? `You and ${names[0]}` : names.join(' and ');
    }
    case 3: {
      return userLikedWorkout
        ? `You, ${names.join(' and ')}`
        : `${names[0]}, ${names.slice(1).join(' and ')}`;
    }
    default: {
      return userLikedWorkout
        ? `You, ${names[0]} and ${names.slice(1).length} others`
        : `${names[0]}, ${names[1]} and ${names.slice(2).length} others`;
    }
  }
};

const WorkoutLikes = ({ totalLikes, workoutId }) => {
  const loadLikes = Boolean(totalLikes);
  const router = useRouter();
  const { user, signedIn } = useUser();
  const [userLikedWorkout, setUserLikedWorkout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matchingUserLike, setMatchingUserLike] = useState();
  const accessToken = getAccessToken();

  const { data, error } = useSWR(
    loadLikes ? `/api/likes?workoutId=${workoutId}` : null,
    fetcher
  );

  useEffect(() => {
    if (signedIn && data?.likes) {
      const matchingLike = data?.likes.filter(
        ({ userId }) => userId === user.id
      );
      setMatchingUserLike(matchingLike);
      setUserLikedWorkout(Boolean(matchingLike.length));
    }
  }, [signedIn, data?.likes, user?.id]);

  if (loadLikes && !data) {
    return <WorkoutLikesSkeleton />;
  }

  if (error || data?.error) {
    return (
      <div className='flex flex-row items-center text-heartRed fill-heartRed'>
        <HeartErrorIcon className='flex-shrink-0 h-5 w-5 mr-1' />
        <p className='text-sm'>Error loading likes</p>
      </div>
    );
  }

  const handleLikeRequest = async () => {
    if (signedIn) {
      setLoading(true);
      setUserLikedWorkout(true);
      const res = await fetch('/api/post/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          workoutId,
          user,
          intent: 'like',
        }),
      }).then((data) => data.json());

      if (res?.success) {
        data?.likes.push({
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
          },
          ...res.newLike,
        });
        setMatchingUserLike([res.newLike]);
      } else {
        setUserLikedWorkout(false);
      }
      setLoading(false);
    } else {
      router.push('/user/login');
    }
  };

  const handleUnlikeRequest = async () => {
    const userLike = matchingUserLike;
    setLoading(true);
    setMatchingUserLike(undefined);
    setUserLikedWorkout(false);
    if (data?.likes) {
      data.likes = data.likes.filter(
        ({ id }) => id !== matchingUserLike?.[0].id
      );
    }
    const res = await fetch('/api/post/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        workoutId,
        likeId: matchingUserLike?.[0]?.id,
        user,
        intent: 'unlike',
      }),
    }).then((data) => data.json());

    if (res?.success) {
      if (data?.likes) {
        data.likes = data.likes.filter(
          ({ id }) => id !== matchingUserLike?.[0].id
        );
      }
    } else {
      setUserLikedWorkout(true);
      setMatchingUserLike(userLike);
      data?.likes.push(userLike);
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-row items-center'>
      {userLikedWorkout ? (
        <button disabled={loading} onClick={() => handleUnlikeRequest()}>
          <HeartIcon
            className='flex-shrink-0 h-4 w-4 mr-1 fill-heartRed transition-all'
            fill
          />
        </button>
      ) : (
        <button disabled={loading} onClick={() => handleLikeRequest()}>
          <HeartIcon className='flex-shrink-0 h-4 w-4 mr-1 transition-transform' />
        </button>
      )}{' '}
      <p className='text-sm font-medium'>
        {data?.likes.length || userLikedWorkout ? (
          <LikesDrawer
            likes={data?.likes}
            text={`Liked by ${totalLikeText(
              userLikedWorkout,
              data?.likes,
              matchingUserLike
            )}`}
          />
        ) : signedIn ? (
          'Be the first to like this workout'
        ) : (
          'Sign in to like this workout'
        )}
      </p>
    </div>
  );
};

export default WorkoutLikes;
