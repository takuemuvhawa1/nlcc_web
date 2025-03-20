import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Header.css';

function Topnav({ backButton }) {
    const navigate = useNavigate();
    const name =localStorage.getItem('UserAlias');

    return (
        <div className='header navbar-light bg-light'>
            {/* BEM Naming Convention */}
            {backButton ? (
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon className='header_logo' fontSize='large' />
                </IconButton>
            ) : (
                <IconButton>
                    <img
                        src="../assets/person.PNG"
                        className="nav-image"
                        style={{
                            width: '43px',
                            height: '43px',
                            borderRadius: '43px',
                            minWidth: '43px' // Prevent size collapse
                        }}
                    />
                </IconButton>
            )}
            <div className="d-flex flex-column text-center flex-grow-0 mx-2">
                <h6 className="m-0 text-truncate" style={{ lineHeight: '1.2' }}>
                    Hi {name}
                    <br />
                    <span className="text-warning" style={{ fontSize: '0.9em', color: '#bd7925' }}>
                        Good Afternoon
                    </span>
                </h6>
            </div>

            <div className="d-flex flex-shrink-0">
                <img
                    src="../assets/nlcc-logo-1.png"
                    style={{
                        width: '143px',
                        height: '43px',
                        objectFit: 'contain' // Ensure logo integrity
                    }}
                />
            </div>
        </div>
    );
}

export default Topnav;