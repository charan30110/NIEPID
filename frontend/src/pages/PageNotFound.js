import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function PageNotFound() {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies();

    const handleReturnHome = () => {
        localStorage.clear()
        removeCookie("jwt")
        navigate('/');
    };

    return (
        <div>
            <header style={headerStyles.header}>
                <p style={headerStyles.title}>Welcome to NIEPID</p>
            </header>
            <div style={styles.container}>
                <h1 style={styles.heading}>Page Not Found</h1>
                <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
                <button style={styles.button} onClick={handleReturnHome}>
                    Return to Home
                </button>
            </div>
            <footer style={footerStyles.footer}>
                <p style={footerStyles.text}>© 2024 NIEPID. All rights reserved.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '76vh',
        backgroundColor: '#f8f8f8',
        color: '#333',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '1rem',
    },
    message: {
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '2rem',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

const headerStyles = {
    header: {
        backgroundColor: '#007bff',
        padding: '1rem',
        textAlign: 'center',
        color: '#ffffff',
    },
    title: {
        margin: 0,
        fontSize: '2vw',
    }
}

const footerStyles = {
    footer: {
        backgroundColor: '#007bff',
        padding: '1rem',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        bottom: 0,
    },
    text: {
        margin: 0,
    }
};

export default PageNotFound;
