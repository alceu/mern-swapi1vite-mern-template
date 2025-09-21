import PersonDetails from './PersonDetails';

export const peopleRoutes = [
  {
    path: ":id", // Relative path for person details
    element: <PersonDetails />,
  },
];