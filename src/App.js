import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AppChat from './pages/AppChat';
import Planos from './pages/Planos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppChat />} />
        <Route path="/planos" element={<Planos />} />
      </Routes>
    </Router>
  );
}

export default App;
