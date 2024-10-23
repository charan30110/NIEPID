import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from 'axios';

import niepidLogo from './th.jpeg';
import cvrlogo from './cvr_logo.jpg';

function Login() {

    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    const [values, setValues] = useState({ id: "", password: "" });

    const [idError, setIdError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
        const role = localStorage.getItem("role")
        if (role && role.trim() !== '') {
            window.open('/' + role, '_self');
        }
        if (cookies.jwt) {
            navigate("/");
        }
    }, [cookies, navigate])

    const generateError = (error) => {
        toast.error(error, {
            position: "top-right",
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const id = values.id
            const password = values.password

            if (!id.trim()) setIdError('Id is required')
            if (!password.trim()) setPasswordError('Password is required')

            if (id.trim() && password.trim()) {
                const response = await axios.post("http://localhost:4001/login",
                    { id: id, password: password }
                );

                if (response.status === 200) {
                    const data = response.data;
                    localStorage.setItem("userId", data.userId)
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("token", data.token);
                    navigate("/" + data.role);
                } else {
                    generateError('Invalid Credentials');
                    return;
                }
            }
        } catch (err) {
            generateError('Invalid Credentials');
        }
    }

    return (
        <div>
            <header style={headerStyles.header}>
                <p style={headerStyles.title}>Welcome to NIEPID</p>
            </header>
            <div style={styles.container}>
                <div style={styles.infoContainer}>
                    <div style={styles.logoContainer}>
                        <img src={niepidLogo} alt="NIEPID Logo" style={styles.logo} />
                        <img src={cvrlogo} alt="CVR Logo" style={styles.logo} />
                    </div>
                    <h1 style={styles.instituteName}>
                        NATIONAL INSTITUTE FOR THE EMPOWERMENT OF PERSONS WITH INTELLECTUAL DISABILITIES (DIVYANGJAN)
                    </h1>
                    <h2 style={styles.subTitle}>Formerly National Institute for the Mentally Handicapped</h2>
                    <p style={styles.department}>Department of Empowerment of Persons with Disabilities (Divyangjan), MSJ&E, Govt of India</p>
                    <p style={styles.address}>Manovikas Nagar, Secunderabad-500009, T.S.</p>
                    <p style={styles.contact}>Ph.No. 091 40 27751741-45. Fax No. 091 40 27750198</p>
                    <p style={styles.tollFree}>24/7 Toll Free Helpline Number - 1800 572 6422</p>
                </div>
                <div style={styles.formContainer}>
                    <h2 style={styles.h2}>Login to your Account</h2>
                    <form onSubmit={(e) => handleSubmit(e)} style={styles.form}>
                        <div style={styles.formGroup}>
                            <div style={styles.error}>
                                <label htmlFor="id" style={styles.label}>Id</label>
                                {idError ? <label style={styles.errorLabel}>&nbsp;&nbsp;&nbsp;{idError}</label> : null}
                            </div>
                            <input
                                type="text"
                                name="id"
                                id="id"
                                placeholder="id"
                                onChange={(e) => {
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                    setIdError('')
                                }}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <div style={styles.error}>
                                <label htmlFor="password" style={styles.label}>Password</label>
                                {passwordError ? <label style={styles.errorLabel}>&nbsp;&nbsp;&nbsp;{passwordError}</label> : null}
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                name="password"
                                onChange={(e) => {
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                    setPasswordError('')
                                }}
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.button}>Submit</button>
                    </form>
                </div>
            </div>
            <footer style={footerStyles.footer}>
                <p style={footerStyles.text}>© 2024 NIEPID. All rights reserved.</p>
            </footer>
        </div>
    );
}

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
};

const footerStyles = {
    footer: {
        backgroundColor: '#007bff',
        padding: '1rem',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        bottom: 0,
        width: '100%',
    },
    text: {
        margin: 0,
    }
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f8f9fa',
        padding: '0 5%',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    errorLabel: {
        color: '#FF0000',
        fontStyle: 'italic'
    },
    error: {
        display: 'flex',
        flexDirection: 'row'
    },
    infoContainer: {
        flex: '1',
        textAlign: 'left',
        padding: '2rem',
    },
    logo: {
        width: '150px',
        marginBottom: '1rem',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    instituteName: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333333',
    },
    subTitle: {
        fontSize: '1.2rem',
        color: '#555555',
    },
    department: {
        fontSize: '1rem',
        color: '#777777',
    },
    address: {
        fontSize: '1rem',
        color: '#777777',
    },
    contact: {
        fontSize: '1rem',
        color: '#777777',
    },
    tollFree: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#555555',
    },
    formContainer: {
        flex: '1',
        backgroundColor: '#ffffff',
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        maxWidth: '400px',
    },
    h2: {
        marginBottom: '1.5rem',
        color: '#333333',
        fontSize: '1.8rem',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    label: {
        fontSize: '1rem',
        color: '#555555',
        marginBottom: '0.5rem',
        textAlign: 'left',
        display: 'block',
    },
    input: {
        padding: '0.8rem',
        fontSize: '1rem',
        border: '1px solid #cccccc',
        borderRadius: '5px',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s',
    },
    inputFocus: {
        borderColor: '#007bff',
    },
    button: {
        padding: '0.8rem',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    span: {
        display: 'block',
        marginTop: '1rem',
        color: '#555555',
        textAlign: 'center',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        transition: 'color 0.3s',
    },
    linkHover: {
        color: '#0056b3',
    },
};

export default Login