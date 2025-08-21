import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PhraseList from './components/PhraseList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AddPhrase from './components/AddPhrase';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Frases Populares</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/add">Add Phrase</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PhraseList />} />
            <Route path="/add" element={<AddPhrase />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
