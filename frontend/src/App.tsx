import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
    </Routes>
  );
};

export default App;