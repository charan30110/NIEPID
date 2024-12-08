import React from 'react'
import image from '../assets/th.jpeg';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function Teacher() {
  const [cookies, , removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    Object.keys(cookies).forEach((cookieName) => {
      removeCookie(cookieName, { path: '/' });
    });
    navigate('/');
  };

  const Header = () => (
    <header style={headerStyles.header}>
      <div style={headerStyles.logo}>
        <img src={image} alt="Logo" style={headerStyles.logoImage} />
        <span style={headerStyles.logoLabel}>NIEPID</span>
      </div>
      <button onClick={handleLogout} style={headerStyles.logoutButton}>
        Logout
      </button>
    </header>
  )

  const Footer = () => (
    <footer style={footerStyles.footer}>
      <p>&copy; 2024 Teacher Dashboard. All rights reserved.</p>
    </footer>
  )

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to Our Website</h1>
        <p style={styles.heroSubtitle}>
          Explore our services and get to know us better.
        </p>
      </div>
      <Footer/>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f8ff',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: '2rem',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '3rem',
    color: '#333333',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    color: '#666666',
    marginBottom: '2rem',
  },
};

const headerStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'right',
    padding: '1rem 2rem',
    backgroundColor: '#007bff',
    color: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '40px',
    height: '40px',
    marginRight: '0.5rem',
  },
  logoLabel: {
    fontSize: '1.5rem',
  },
  logoutButton: {
    padding: '10px 15px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
}

const footerStyles = {
  footer: {
    textAlign: 'center',
    padding: '0.1vw',
    backgroundColor: '#007bff',
    color: '#ffffff',
  },
}

export default Teacher