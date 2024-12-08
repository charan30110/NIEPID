import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { FaQuestionCircle } from 'react-icons/fa'

import image from '../assets/th.jpeg';
import excelImage from '../assets/excelExample.png'

function Admin() {
  const [cookies, , removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const [fileUploadStatus, setFileUploadStatus] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isExcelImageOpen, setIsExcelImageOpen] = useState(false);

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
      <p>&copy; 2024 Admin Dashboard. All rights reserved.</p>
    </footer>
  )

  const handleOpenModal = () => {
    setIsExcelImageOpen(true);
  };

  const handleCloseModal = () => {
    setIsExcelImageOpen(false);
  };

  const handleTeacherRegister = () => {

  }

  const handleViewTeacher = () => {

  }

  const handleDownloadFile = async () => {
    try {
      console.log("Hi")
      const res = await axios.get('http://localhost:4001/admin/downloadExcel', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.jwt}`,
        },
        responseType: 'blob',
        maxRedirects: 0,
        withCredentials: true
      })
      if (res.status === 200) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'untitled.xlsx'); // Change 'sampleDataTeacher.xlsx' to the name you want
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log('Error Downloading File : ', res.data)
      }
    } catch (error) {
      console.log('Error Downloading file : ', error)
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to Our Website</h1>
        <p style={styles.heroSubtitle}>
          Explore our services and get to know us better.
        </p>
      </div>
      <div style={styles.adminContainer}>
        <div style={styles.halfContainer}>
          <h1 style={styles.h1}>Teachers</h1>
          <form onSubmit={handleTeacherRegister} style={styles.formGroup}>
            <div style={styles.buttonContainer}>
              <div style={styles.buttonWrapper}>
                <button type="button" onClick={handleViewTeacher} style={styles.button}>
                  View
                </button>
                <p style={styles.buttonDescription}>View registered teachers.</p>
              </div>
              <div style={styles.buttonWrapper}>
                <button type="button" onClick={handleDownloadFile} style={styles.button}>
                  Download Spreadsheet
                </button>
                <p style={styles.buttonDescription}>Download the teacher spreadsheet.</p>
              </div>
              <div style={styles.buttonWrapper}>
                <label style={styles.label}>Upload Excel File(.xls, .xlsx, .csv):</label>
                <input type="file" accept='.xls, .xlsx, .csv' onChange={handleFileChange} style={styles.input} />
              </div>
              <div style={styles.buttonWrapper}>
                <button type="submit" style={styles.button}>
                  Register
                </button>
                <FaQuestionCircle onClick={handleOpenModal} style={{ cursor: 'pointer' }} size={24} color='grey' />
                <p style={styles.buttonDescription}>Upload and register new teachers.</p>
              </div>
            </div>
          </form>
        </div>
        <div style={styles.halfContainer}>
          <h1 style={styles.h1}>Students</h1>
        </div>
      </div>
      <Footer />
      {isExcelImageOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={handleCloseModal}>&times;</span>
            <p style={styles.modalText}>Sample Teacher Details</p>
            <img src={excelImage} alt="Excel File Preview" style={styles.image} />
          </div>
        </div>
      )}
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
    padding: '1.5rem',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '3rem',
    color: '#333333',
    margin: '1rem'
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    color: '#666666',
    margin: '0.5rem'
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
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '30px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  modalText: {
    fontSize: '1.5vw'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
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

export default Admin