export const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

export const getGoalsColor = (goals: number) => {
  if (goals >= 40) return "text-green-600";
  if (goals >= 25) return "text-yellow-600";
  return "text-red-600";
};

export const getStreakColor = (streak: number) => {
  if (streak >= 25) return "text-green-600";
  if (streak >= 10) return "text-yellow-600";
  return "text-red-600";
};

export const getBallsColor = (balls: number) => {
  if (balls >= 150) return "text-green-600";
  if (balls >= 100) return "text-yellow-600";
  return "text-red-600";
};

export const getSpeedOfPlayColor = (speed: number) => {
  if (speed >= 3.5) return "text-green-600";
  if (speed >= 2.5) return "text-yellow-600";
  return "text-red-600";
};

export const getExercisesColor = (exercises: number) => {
  if (exercises >= 8) return "text-green-600";
  if (exercises >= 5) return "text-yellow-600";
  return "text-red-600";
};
