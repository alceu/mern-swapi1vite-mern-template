import FilmDetails from './FilmDetails';

export const filmRoutes = [
  {
    path: ":id", // Relative path for film details
    element: <FilmDetails />,
  },
];