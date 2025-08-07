import { Link } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));

  // Poll for token every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const token = Cookies.get('token');
      setIsLoggedIn(!!token);
    }, 2000); // every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">InstaAI</div>
      <div className="navbar-links">
        <Link to="/">Upload</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          // ✅ Show logout button when logged in
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
