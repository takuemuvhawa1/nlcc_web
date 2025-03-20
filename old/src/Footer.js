import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#f8f9fa',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      padding: '0.5rem 0',
      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)'
    }}>
      <div id="buttonGroup" style={{
        display: 'flex',
        justifyContent: 'space-around',
        maxWidth: '600px',
        margin: '0 auto'
      }} role="group" aria-label="Main navigation">
        <NavLink 
          to="/home" 
          className={({ isActive }) => 
            `btn btn-secondary ${isActive ? 'button-active' : 'button-inactive'}`
          }
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.5rem 1rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <i className="material-icons" style={{ fontSize: '1.5rem' }}>roofing</i>
            <span style={{ fontSize: '0.8rem' }}>Home</span>
          </div>
        </NavLink>

        {/* Repeat same style pattern for other NavLinks */}
        <NavLink 
          to="/sermons" 
          className={({ isActive }) => 
            `btn btn-secondary ${isActive ? 'button-active' : 'button-inactive'}`
          }
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.5rem 1rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <i className="material-icons" style={{ fontSize: '1.5rem' }}>menu_book</i>
            <span style={{ fontSize: '0.8rem' }}>Sermons</span>
          </div>
        </NavLink>

        <NavLink 
          to="/contributions" 
          className={({ isActive }) => 
            `btn btn-secondary ${isActive ? 'button-active' : 'button-inactive'}`
          }
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.5rem 1rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <i className="material-icons" style={{ fontSize: '1.5rem' }}>payment</i>
            <span style={{ fontSize: '0.8rem' }}>Contributions</span>
          </div>
        </NavLink>

        <NavLink 
          to="/more" 
          className={({ isActive }) => 
            `btn btn-secondary ${isActive ? 'button-active' : 'button-inactive'}`
          }
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.5rem 1rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <i className="material-icons" style={{ fontSize: '1.5rem' }}>apps</i>
            <span style={{ fontSize: '0.8rem' }}>More</span>
          </div>
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;