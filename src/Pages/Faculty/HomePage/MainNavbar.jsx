import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../Assests/Images/gstlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import './styles/MainNavbar.css';
import Logout from '../../Authentication/Logout/Logout'


export default function MainNavbar() {

    const [menuOption, setMenuOption] = useState(true);
    const [sentenceIndex, setSentenceIndex] = useState(0);

    const sentences = [
        'SIES Graduate School of Technology',
        'Accredited with NAAC A+ Grade and NBA Accredited',
        'www.siesgst.edu.in',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }, 10000); // Change sentence every 10 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className='mainNavbar' id='mainNavbar'>
            <div className='container-fluid px-5' style={{ height: 'auto', backgroundColor: '' }}>
                <div className='row' style={{ borderBottom: '1px solid black' }}>
                    <div className='nav-1 col col-lg-3'>
                        <Link className="text-decoration-none d-flex justify-content-start align-items-center" to='/' style={{ height: '300px' }}>
                            <img src={logo} className='img-fluid img-logo' alt='' style={{ height: '200px' }} />
                        </Link>
                    </div>

                    <div className='nav-2 col col-lg-7 d-flex align-items-center justify-content-center' style={{ paddingLeft: '50px', paddingRight: '50px' }}>
                        <div className='sentence-display'>
                            {sentences[sentenceIndex] === 'www.siesgst.edu.in' ? (
                                <a href={`http://${sentences[sentenceIndex]}`} className='text-decoration-none text-dark display-4' target="_blank" rel="noopener noreferrer">
                                    {sentences[sentenceIndex]}
                                </a>
                            ) : (
                                <h4 className='display-4 text-center'>{sentences[sentenceIndex]}</h4>
                            )}
                        </div>
                    </div>

                    <div className='nav-3 col col-lg-2'>
                        <div className='menu-btn d-flex justify-content-end align-items-center' style={{ height: '300px' }}>
                            <button className='border-0 bg-transparent' onClick={() => setMenuOption(!menuOption)}>
                                {menuOption ? (
                                    <FontAwesomeIcon icon={faBars} style={{ height: '100px' }} />
                                ) : (
                                    <FontAwesomeIcon icon={faXmark} style={{ height: '100px' }} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`row homePageHiddenNav ${menuOption ? 'hidden' : 'visible'}`}>
                    <div className='d-flex justify-content-end align-items-center'>
                        <div className='px-5'>
                            <Link to='/faculty/' className='display-5 text-decoration-none text-dark'>
                                Home
                            </Link>
                        </div>

                        <div className='px-5'>
                            <Link to='/faculty/attendanceUpdate' className='display-5 text-decoration-none text-dark'>
                                Attendance Update
                            </Link>
                        </div>

                        <div className='px-5'>
                            <Link to='/faculty/reportPage' className='display-5 text-decoration-none text-dark' >
                                Report Page
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
