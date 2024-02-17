const sessionEnd = new Date(2024, 1, 16);

export const getRemainingDays = () =>
  Math.ceil(
    (sessionEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

export const isSessionOver = () => getRemainingDays() <= 0;
