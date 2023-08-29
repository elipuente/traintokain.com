import { useEffect, useState } from 'react';

export const useOnScreen = (ref) => {
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const intersectionObserver = new IntersectionObserver(([entry]) =>
      setIntersected(entry.isIntersecting)
    );

    intersectionObserver.observe(ref.current);

    return () => {
      intersectionObserver.disconnect();
    };
  });

  return intersected;
};
