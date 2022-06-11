import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navigation from './Navigation';
import SearchPage from './SearchPage';
import RecommendationPage from './RecommendationPage';

const container = document.getElementById('app');
const root = createRoot(container);
// Nested routes are displayed with outlet tag
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recommendation" element={<RecommendationPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
