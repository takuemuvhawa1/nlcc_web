import React from "react";
import { NavLink } from 'react-router-dom';

const More = () => {
    // Dummy function for navigation (replace with your actual navigation logic)
    const handleNavigation = (page) => {
        console.log(`Navigating to ${page}`);
        // Add your navigation logic here
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>More</h1>
            <div style={styles.menuContainer}>
                {/* My Profile Card */}
                <NavLink to="/myprofile" style={{ textDecoration: 'none' }}>
                    <div
                        style={styles.card}
                        onClick={() => handleNavigation("My Profile")}
                    >
                        <div style={styles.cardContent}>
                            <span style={styles.cardText}>My Profile</span>
                            <span style={styles.cardIcon}>👤</span>
                        </div>
                    </div>
                </NavLink>

                {/* Profile Settings Card */}
                <NavLink to="/settings" style={{ textDecoration: 'none' }}>
                    <div
                        style={styles.card}
                        onClick={() => handleNavigation("Profile Settings")}
                    >
                        <div style={styles.cardContent}>
                            <span style={styles.cardText}>Profile Settings</span>
                            <span style={styles.cardIcon}>⚙️</span>
                        </div>
                    </div>
                </NavLink>

                {/* Family Members (Kids) Card */}
                <NavLink to="/kids" style={{ textDecoration: 'none' }}>
                    <div
                        style={styles.card}
                        onClick={() => handleNavigation("Family Members (Kids)")}
                    >
                        <div style={styles.cardContent}>
                            <span style={styles.cardText}>Family Members (Kids)</span>
                            <span style={styles.cardIcon}>👨‍👩‍👧‍👦</span>
                        </div>
                    </div>
                </NavLink>

                {/* About Card */}
                <NavLink to="/about" style={{ textDecoration: 'none' }}>
                    <div
                        style={styles.card}
                        onClick={() => handleNavigation("About")}
                    >
                        <div style={styles.cardContent}>
                            <span style={styles.cardText}>About</span>
                            <span style={styles.cardIcon}>ℹ️</span>
                        </div>
                    </div>
                </NavLink>

                {/* Sign Out Card */}
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <div
                        style={styles.card}
                        onClick={() => handleNavigation("Sign Out")}
                    >
                        <div style={styles.cardContent}>
                            <span style={styles.cardText}>Sign Out</span>
                            <span style={styles.cardIcon}>🚪</span>
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        // backgroundColor: "#f5f5f5",
        backgroundColor: "#fff",
        minHeight: "100vh",
    },
    header: {
        fontSize: "24px",
        color: "#1a6363",
        marginBottom: "20px",
    },
    menuContainer: {
        width: "100%",
        maxWidth: "500px",
    },
    card: {
        // backgroundColor: "#ffffff",
        backgroundColor: "#f5f5f5",
        border: "1px solid #1a6363",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px 0",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardText: {
        fontSize: "16px",
        color: "#1a6363",
    },
    cardIcon: {
        fontSize: "20px",
    },
};

export default More;