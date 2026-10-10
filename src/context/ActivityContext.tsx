
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type SportActivity = {
  id: string;
  type: 'Course' | 'Marche' | 'Vélo' | 'Natation' | 'Fitness';
  date: string;
  duration: number;
  distance: number;
  calories: number;
  comment: string;
  photoUri?: string;
};

const SAMPLE_ACTIVITIES: SportActivity[] = [
  {
    id: '1',
    type: 'Course',
    date: '2026-10-01',
    duration: 35,
    distance: 5,
    calories: 320,
    comment: 'Morning run',
  },
  {
    id: '2',
    type: 'Vélo',
    date: '2026-10-03',
    duration: 60,
    distance: 18,
    calories: 450,
    comment: 'Weekend cycling',
  },
  {
    id: '3',
    type: 'Marche',
    date: '2026-10-05',
    duration: 40,
    distance: 3,
    calories: 160,
    comment: 'Evening walk',
  },
];

type ActivityContextType = {
  activities: SportActivity[];
  updateActivityPhoto: (id: string, photoUri: string) => void;
};

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] =
    useState<SportActivity[]>(SAMPLE_ACTIVITIES);

  function updateActivityPhoto(id: string, photoUri: string) {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === id ? { ...activity, photoUri } : activity
      )
    );
  }

  return (
    <ActivityContext.Provider value={{ activities, updateActivityPhoto }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error('useActivities must be used inside ActivityProvider');
  }

  return context;
}
