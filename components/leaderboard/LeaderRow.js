import { useRouter } from 'next/router';

import TextLink from '../TextLink';

import { useUser } from '../../utils/user';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const BoldCell = ({ children }) => (
  <td className='whitespace-nowrap px-6 py-4 font-medium'>{children}</td>
);

const Cell = ({ children }) => (
  <td className='whitespace-nowrap px-6 py-4'>{children}</td>
);

const LeaderRow = ({ person, index }) => {
  const { user, signedIn } = useUser();
  const router = useRouter();
  const isUserRow = signedIn && user.id === person.id;

  return (
    <tr
      className={classNames(
        isUserRow && 'bg-gray-200',
        'border-b transition duration-300 ease-in-out hover:bg-neutral-100 cursor-pointer'
      )}
      onClick={() => router.push(`user/${person.id}/workouts`)}
      key={index}
    >
      <BoldCell>{index + 1}</BoldCell>
      <Cell>
        {isUserRow ? 'You' : `${person.firstName} ${person.lastName}`}
      </Cell>
      <Cell>
        <p className='text-center md:text-left'>{`${person.totalScore}`}</p>
      </Cell>
      <Cell>
        <TextLink href={`/user/${person.id}/workouts`} text='View Workouts' />
      </Cell>
    </tr>
  );
};

export default LeaderRow;
