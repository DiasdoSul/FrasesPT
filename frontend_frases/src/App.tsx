import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PhraseList from './components/PhraseList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AddPhrase from './components/AddPhrase';
import AdminDashboard from './components/AdminDashboard';
import api from './api/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const refreshAuthState = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      try {
        const response = await api.get('/auth/user/'); // DRF endpoint returning user info
        setIsAuthenticated(true);
        setUsername(response.data.username);
      } catch {
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        setUsername('');
      }
    } else {
      setIsAuthenticated(false);
      setUsername('');
    }
  };

  useEffect(() => {
    refreshAuthState();
    const onAuthChanged = () => refreshAuthState();
    window.addEventListener('auth:changed', onAuthChanged);
    return () => window.removeEventListener('auth:changed', onAuthChanged);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUsername('');
    window.dispatchEvent(new Event('auth:changed'));
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Frases Populares</h1>
          <nav>
            <Link to="/">Home</Link>
            {isAuthenticated && <Link to="/add">Add Phrase</Link>}
            <Link to="/admin">Admin</Link>
            {!isAuthenticated && <Link to="/login">Login</Link>}
            {!isAuthenticated && <Link to="/register">Register</Link>}
            {isAuthenticated && (
              <>
                <span style={{ marginLeft: 8 }}>Hello, {username}</span>
                <button onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
              </>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PhraseList />} />
            <Route path="/add" element={<AddPhrase />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login onLogin={refreshAuthState} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
