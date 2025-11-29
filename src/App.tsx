import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Article } from './pages/Article';
import { Category } from './pages/Category';
import { MortgageCalculator } from './pages/MortgageCalculator';
import { LocationProvider } from './context/LocationContext';

function App() {
  return (
    <LocationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/tool/mortgage-calculator" element={<MortgageCalculator />} />
          </Routes>
        </Layout>
      </Router>
    </LocationProvider>
  );
}

export default App;