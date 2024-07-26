import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Styles/OffcanvasNavbar.css'

const OffcanvasNavbar = () => {
  const navigate = useNavigate();

  const closeOffcanvas = () => {
    document.getElementById('offcanvasNavbar').classList.remove('show'); // Hide offcanvas menu
  };

  const handleNavigation = (path) => {
    closeOffcanvas(); // Close offcanvas menu when navigating
    navigate(path); // Navigate to the specified path
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container rounded py-2 px-4" style={{backgroundColor:'#f9f9f9' ,boxShadow:'0 0 6px grey'}}>
          <button className="btn p-0 m-0 " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <FontAwesomeIcon icon={faBars} size="2xl" />
          </button>
          <div className='d-flex justify-content-center'>
            <h2 onClick={()=>{navigate('/')}}>
                Faculty View
            </h2>
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-start rounded ms-0 m-2" data-bs-backdrop="false" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{fontFamily:'Verdana'}}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel" onClick={()=>{navigate('/')}}>Offcanvas Navbar</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link className="nav-link" to="/faculty">Dashboard</Link>
            </li>
            <li className="nav-item"> 
              <Link className="nav-link" to="/faculty/SessionUpdate" >Session Update</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faculty/reportPage" >Report</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faculty/leave" >Leave</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OffcanvasNavbar;
