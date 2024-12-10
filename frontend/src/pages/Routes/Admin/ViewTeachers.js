import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { FaEye, FaTimes, FaEdit, FaSearch } from 'react-icons/fa';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import image from '../../assets/th.jpeg'

function ViewTeachers() {

  const [cookies, , removeCookie] = useCookies()
  const navigate = useNavigate()
  const headers = ["ID", "Name", "Email", "Mobile", "Class ID", "Actions"];

  const [teacherDetails, setTeacherDetails] = useState([]);
  const [selectedTeacherDetails, setSelectedTeacherDetails] = useState([])
  const [viewTeacherDetails, setViewTeacherDetails] = useState({})

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const [filteredDetails, setFilteredDetails] = useState([]);
  const [searchQueries, setSearchQueries] = useState({
    teacherId: "",
    teacherName: "",
    email: "",
    teacherMNo: "",
    classId: "",
  });
  const [visibleSearchFields, setVisibleSearchFields] = useState({});

  const handleSeletectedTeacherDetails = (e, i) => {
    let { name, value } = e.target
    if (name === "teacherMNo") {
      value = value.replace(/[^0-9]/g, '')
    }
    const updatedDetails = [...selectedTeacherDetails];
    updatedDetails[i] = { ...updatedDetails[i], [name]: value };
    setSelectedTeacherDetails(updatedDetails);
  }

  const handleOpenModal = (type, teacher) => {
    const details = []
    for (const classId of teacher.classId) {
      let demoTeacher = {
        teacherId: teacher.teacherId,
        teacherName: teacher.teacherName,
        email: teacher.email,
        teacherMNo: teacher.teacherMNo,
      }
      demoTeacher.classId = classId
      details.push(demoTeacher)
    }
    setViewTeacherDetails(teacher)
    setSelectedTeacherDetails(details)
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedTeacherDetails({})
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault()
    try {
      const mobileRegex = /^[0-9]{10}$/
      const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/
      toast.dismiss()
      for (const details of selectedTeacherDetails) {
        if (!details.teacherId || !details.teacherName) {
          toast.error("All Fields are required", { position: 'top-right' })
          return
        } else if (!emailRegex.test(details.email)) {
          toast.error("Invalid Email", { position: 'top-right' })
          return
        } else if (!mobileRegex.test(details.teacherMNo)) {
          toast.error("Invalid Mobile", { position: 'top-right' })
          return
        }
      }
      let res = await axios.post('http://localhost:4001/admin/updateSingleTeacher', { selectedTeacherDetails: selectedTeacherDetails, method: modalType }, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookies.jwt}`,
        },
        withCredentials: true
      })
        .catch((error) => {
          console.log(error)
        })
      if (res) {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get('http://localhost:4001/admin/viewTeachers', {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${cookies.jwt}`,
          },
          withCredentials: true
        })
          .catch((error) => {
            console.log(error)
            toast.error("Cannot get Teacher details", { position: 'top-right' })
          })

        if (res) {
          setTeacherDetails(res.data.details)
          setFilteredDetails(res.data.details);
          console.log(res)
        }
      } catch (error) {
        console.log(error)
        toast.error("Cannot get Teacher details", { position: 'top-right' })
      }
    }
    fetchData()
  }, [cookies])

  useEffect(() => {
    const filtered = teacherDetails.filter((teacher) => {
      return (
        teacher.teacherId.toLowerCase().includes(searchQueries.teacherId.toLowerCase()) &&
        teacher.teacherName.toLowerCase().includes(searchQueries.teacherName.toLowerCase()) &&
        teacher.email.toLowerCase().includes(searchQueries.email.toLowerCase()) &&
        teacher.teacherMNo.toLowerCase().includes(searchQueries.teacherMNo.toLowerCase()) &&
        teacher.classId.join(', ').toLowerCase().includes(searchQueries.classId.toLowerCase())
      );
    });
    setFilteredDetails(filtered);
  }, [searchQueries, teacherDetails]);

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
      <p>&copy; 2024 Admin. All rights reserved.</p>
    </footer>
  )

  const handlePrint = () => {
    window.print()
  }

  const handleSearchChange = (e, key) => {
    const value = e.target.value;
    setSearchQueries((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSearchField = (key) => {
    setVisibleSearchFields((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.subContainer}>
        <h1 style={styles.heading}>Teacher Details</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th style={styles.th} key={header}>
                  {index < headers.length - 1 && (
                    <>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        {header}
                        <FaSearch
                          color='#555'
                          style={styles.searchIcon}
                          onClick={() => toggleSearchField(Object.keys(searchQueries)[index])}
                        />
                      </div>
                      {visibleSearchFields[Object.keys(searchQueries)[index]] && (
                        <input
                          type="text"
                          placeholder={`Search ${header}`}
                          style={styles.searchInput}
                          value={searchQueries[Object.keys(searchQueries)[index]]}
                          onChange={(e) => handleSearchChange(e, Object.keys(searchQueries)[index])}
                        />
                      )}
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              filteredDetails.map((teacher, index) => (
                <tr
                  key={teacher.teacherId}
                  style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <td style={styles.td}>{teacher.teacherId}</td>
                  <td style={styles.td}>{teacher.teacherName}</td>
                  <td style={styles.td}>{teacher.email}</td>
                  <td style={styles.td}>{teacher.teacherMNo}</td>
                  <td style={styles.td}>{teacher.classId.join(', ')}</td>
                  <td style={styles.iconContainer}>
                    <FaEye onClick={() => { handleOpenModal('view', teacher) }} style={styles.icon} size={24} color='#555' />
                    <FaEdit onClick={() => { handleOpenModal('edit', teacher) }} style={styles.icon} size={24} color='#555' />
                    <FaTimes onClick={() => { handleOpenModal('delete', teacher) }} style={styles.icon} size={24} color='#555' />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div style={styles.print}>
        <button onClick={handlePrint} style={styles.backButton}>
          Print
        </button>
      </div>
      <Footer />
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </span>
            <h1 style={styles.modalTitle}>
              {modalType === 'view'
                ? 'View Details'
                : modalType === 'edit'
                  ? 'Edit Teacher Details'
                  : 'Enter Alternate Teacher Details to Replace'}
            </h1>
            {modalType === 'view' && (
              <div style={styles.modalDetails}>
                <p><b>TeacherId:</b> {viewTeacherDetails.teacherId}</p>
                <p><b>Teacher Name:</b> {viewTeacherDetails.teacherName}</p>
                <p><b>Email:</b> {viewTeacherDetails.email}</p>
                <p><b>Teacher MNo:</b> {viewTeacherDetails.teacherMNo}</p>
                <p><b>ClassId:</b> {viewTeacherDetails.classId.join(', ')}</p>
              </div>
            )}
            {(modalType === 'edit' || modalType === "delete") && (
              <form>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', margin: '1vw' }}>
                  {
                    selectedTeacherDetails.map((teacher, i) => (
                      <div key={i} style={styles.modalEditForm}>
                        <div style={styles.modalEdit}>
                          <label style={styles.modalEditlabel}>TeacherId:</label>
                          <input style={styles.modalEditinput} onChange={(e) => handleSeletectedTeacherDetails(e, i)} name='teacherId' type='text' value={teacher.teacherId} />
                        </div>
                        <div style={styles.modalEdit}>
                          <label style={styles.modalEditlabel}>Teacher Name:</label>
                          <input style={styles.modalEditinput} onChange={(e) => handleSeletectedTeacherDetails(e, i)} name='teacherName' type='text' value={teacher.teacherName} />
                        </div>
                        <div style={styles.modalEdit}>
                          <label style={styles.modalEditlabel}>Email:</label>
                          <input style={styles.modalEditinput} onChange={(e) => handleSeletectedTeacherDetails(e, i)} name='email' type='text' value={teacher.email} />
                        </div>
                        <div style={styles.modalEdit}>
                          <label style={styles.modalEditlabel}>Teacher MNo:</label>
                          <input style={styles.modalEditinput} onChange={(e) => handleSeletectedTeacherDetails(e, i)} name='teacherMNo' type='text' value={teacher.teacherMNo} maxLength={10} />
                        </div>
                        <div style={styles.modalEdit}>
                          <label style={styles.modalEditlabel}>ClassId:</label>
                          <input style={styles.modalEditinput1} type='text' value={teacher.classId} disabled={true} />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <button style={styles.modalButton} onClick={handleModalSubmit}>SUBMIT</button>
              </form>
            )}
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
    maxWidth: "95%",
    minHeight: '85vh',
    padding: "20px",
    margin: "20px auto",
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontSize: "28px",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#333",
    width: 'fit-content',
    fontFamily: "'Roboto', sans-serif",
  },
  table: {
    width: "80%",
    borderCollapse: "collapse",
    margin: "10px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundImage: "linear-gradient(to right, #0066cc, #0099ff)",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "16px",
    top: "0",
    zIndex: "1",
  },
  td: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    color: "#555",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  td1: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    width: "12vw",
    color: "#555",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
    transition: "background-color 0.3s",
  },
  oddRow: {
    backgroundColor: "#ffffff",
    transition: "background-color 0.3s",
  },
  print: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  backButton: {
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
  },
  iconContainer: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  icon: {
    padding: '0.5vw',
    cursor: 'pointer'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '60%',
    // maxWidth: '600px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: '2%',
    right: '2%',
    fontSize: '32px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#333',
    transition: 'color 0.3s',
  },
  closeButtonHover: {
    color: '#ff0000',
  },
  modalTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#007bff',
    fontFamily: "'Roboto', sans-serif",
  },
  modalDetails: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.6',
  },
  modalEditForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',
  },
  modalEdit: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  modalEditlabel: {
    fontSize: '16px',
    color: '#555',
    fontWeight: '500',
    padding: '8px'
  },
  modalEditinput: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '50%',
  },
  modalEditinput1: {
    cursor: 'not-allowed',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '50%',
  },
  modalButton: {
    alignSelf: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  searchIcon: {
    marginTop:'3px',
    marginRight:'3px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  searchInput: {
    width: '80%',
    padding: '4px',
    marginTop: '4px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '12px',
  },
}

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

export default ViewTeachers