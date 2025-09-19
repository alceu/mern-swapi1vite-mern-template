import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PersonDetails from './pages/PersonDetails';
import FilmDetails from './pages/FilmDetails';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/people/:id" element={<PersonDetails />} />
      <Route path="/films/:id" element={<FilmDetails />} />
    </Routes>
  );
};

export default App;