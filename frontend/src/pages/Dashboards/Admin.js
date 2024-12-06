import React from 'react'
import image from '../assets/th.jpeg';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function Admin() {
  const [cookies, , removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    Object.keys(cookies).forEach((cookieName) => {
      removeCookie(cookieName, { path: '/' });
    });
    navigate('/');
  };

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src={image} alt="Logo" style={styles.logoImage} />
          <span style={styles.logoLabel}>NIEPID</span>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>
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
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  navLinkHover: {
    color: '#cccccc',
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
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    margin: '0.5rem',
    width: '100%',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  },
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#007bff',
    color: '#ffffff',
  },
  adminContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '2rem',
    backgroundColor: '#f0f8ff',
  },
  halfContainer: {
    flex: '1 1 45%',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  h1: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    width: '100%',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem',
    width: '100%',
  },
  buttonDescription: {
    fontSize: '0.9rem',
    color: '#666',
    textAlign: 'center',
    marginTop: '0.5rem',
  },
  uploadStatus: {
    color: '#ff0000',
    marginTop: '1rem',
    textAlign: 'center',
  },
  b1: {
    fontSize: '0.9rem',
    color: '#666',
    textAlign: 'center',
    marginTop: '0.5rem',

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
  logoutButtonHover: {
    backgroundColor: '#e60000',
  }
};

export default Admin