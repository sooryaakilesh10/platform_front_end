export interface Course {
  id: string;
  title: string;
  progress: number;
  module: string;
  imageUrl: string;
  status: 'current' | 'next';
  instructor: string;
  timeRemaining?: string;
  completed?: boolean;
  startNow?: boolean;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  type: 'Live Session' | 'Assignment Due' | 'Group Study';
  action: {
    label: string;
    onClick: () => void;
  };
}

export interface Stats {
  hoursSpent: number;
  lessonsCompleted: number;
  pointsEarned: number;
  dayStreak: number;
}