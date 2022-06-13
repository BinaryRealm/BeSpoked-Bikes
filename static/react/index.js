import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navigation from './Navigation';
import SalespersonsPage from './SalespersonsPage';
import SalespersonUpdatePage from './SalespersonUpdatePage';
import ProductsPage from './ProductsPage';
import ProductUpdatePage from './ProductUpdatePage';
import CustomersPage from './CustomersPage';
import SalesPage from './SalesPage';
import CreateSalePage from './CreateSalePage';
import ReportPage from './ReportPage';

const container = document.getElementById('app');
const root = createRoot(container);
// Nested routes are displayed with outlet tag
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<SalespersonsPage />} />
        <Route path="/salespersons" element={<SalespersonsPage />} />
        <Route path="/salesperson" element={<SalespersonUpdatePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product" element={<ProductUpdatePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/new-sale" element={<CreateSalePage />} />
        <Route path="/report" element={<ReportPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
