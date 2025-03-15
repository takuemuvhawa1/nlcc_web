import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt,
    faUsers,
    faDonate,
    faHandHoldingHeart,
    faCalendarAlt,
    faChurch,
    faChartLine,
    faSignOutAlt,
    faTools
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ show }) => {
    const [displaySidebar, setDisplaySidebar] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        if (show) {
            setDisplaySidebar(true);
        }
    }, [show])


    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const handleLogout = () => {
        localStorage.clear();
        console.log("User logged out");
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            navigate('/')
        }
    }, [])

    return (
        // <div className="nav_open">
        <>
            {!displaySidebar && (
                <div>
                    <head>
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta
                            content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
                            name="viewport"
                        />
                        {/* <!-- CSS Files --> */}
                        <link rel="stylesheet" href="../assets/css/plugins.min.css" />
                        <link rel="stylesheet" href="../assets/css/kaiadmin.min.css" />

                    </head>

                    <div className="sidebar" data-background-color="dark">
                        <div className="sidebar-logo">
                            <div className="logo-header" data-background-color="dark">
                                <Link to="/dashboard" className="logo">
                                    <img
                                        src="../assets/img/nlcc-logo.png"
                                        // src="../assets/img/logo_dark.png"
                                        alt="nlcc logo"
                                        className="navbar-brand"
                                        // height="20"
                                        height="50"
                                        width="130"
                                    />
                                </Link>
                                <div class="nav-toggle">
                                    <button class="btn btn-toggle toggle-sidebar">
                                        <i class="gg-menu-right"></i>
                                    </button>
                                    <button class="btn btn-toggle sidenav-toggler">
                                        <i class="gg-menu-left"></i>
                                    </button>
                                </div>
                                <button class="topbar-toggler more">
                                    <i class="gg-more-vertical-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div className="sidebar-wrapper scrollbar scrollbar-inner">
                            <div className="sidebar-content">
                                <ul className="nav nav-secondary">
                                    {/* Dashboard */}
                                    <li className="nav-item active">
                                        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Dashboard</p>
                                        </Link>
                                    </li>

                                    {/* Member Management */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("memberManagement")}
                                            className={`collapsed ${openDropdown === "memberManagement" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Members</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "memberManagement" ? "show" : ""}`} id="memberManagement">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/members" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Members List</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/visitors" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Visitors</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/pastmembers" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Past Members</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/children" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Children</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/prayer-req" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Prayer Requests</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Ministry Management */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("ministryManagement")}
                                            className={`collapsed ${openDropdown === "ministryManagement" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faChurch} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Ministries & Cell Groups</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "ministryManagement" ? "show" : ""}`} id="ministryManagement">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/ministries" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Ministries</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/joinrequests" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Requests to Join</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/cellgroups" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Cell Groups</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Event Management */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("eventManagement")}
                                            className={`collapsed ${openDropdown === "eventManagement" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Events</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "eventManagement" ? "show" : ""}`} id="eventManagement">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/events" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Event Registrations</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/volunteeropptunities" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Volunteer Tasks</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/attendance" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Attendance Tracking</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>



                                    {/* Giving & Contributions */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("givingContributions")}
                                            className={`collapsed ${openDropdown === "givingContributions" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faDonate} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Giving</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "givingContributions" ? "show" : ""}`} id="givingContributions">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/contributions" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Cash Contributions</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/donations" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Non-Cash Contributions</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/projects" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Categories</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Reports & Analytics */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("reportsAnalytics")}
                                            className={`collapsed ${openDropdown === "reportsAnalytics" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Media & Notifications</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "reportsAnalytics" ? "show" : ""}`} id="reportsAnalytics">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/sermons" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Sermons</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/notifications" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Notifications</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </li>

                                    {/* Admin Panel */}
                                    <li className="nav-item">
                                        <Link
                                            type="button"
                                            onClick={() => toggleDropdown("adminpanel")}
                                            className={`collapsed ${openDropdown === "adminpanel" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faTools} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Settings</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "adminpanel" ? "show" : ""}`} id="adminpanel">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/users" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Users</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/changepassword" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Change Password</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Logout Option */}
                                    <li className="nav-item" style={{ marginTop: 'auto' }}>
                                        <Link
                                            to="/"
                                            onClick={handleLogout}
                                            className="nav-link"
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >

                                            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Logout</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {displaySidebar && (
                <div className="nav_open">
                    <head>
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta
                            content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
                            name="viewport"
                        />
                        {/* <!-- CSS Files --> */}
                        <link rel="stylesheet" href="../assets/css/plugins.min.css" />
                        <link rel="stylesheet" href="../assets/css/kaiadmin.min.css" />

                    </head>

                    <div className="sidebar" data-background-color="dark">
                        <div className="sidebar-logo">
                            <div className="logo-header" data-background-color="dark">
                                <Link to="/dashboard" className="logo">
                                    <img
                                        src="../assets/img/nlcc-logo.png"
                                        // src="../assets/img/logo_dark.png"
                                        alt="nlcc logo"
                                        className="navbar-brand"
                                        // height="20"
                                        height="50"
                                        width="130"
                                    />
                                </Link>
                                <div class="nav-toggle">
                                    <button class="btn btn-toggle toggle-sidebar">
                                        <i class="gg-menu-right"></i>
                                    </button>
                                    <button class="btn btn-toggle sidenav-toggler">
                                        <i class="gg-menu-left"></i>
                                    </button>
                                </div>
                                <button class="topbar-toggler more">
                                    <i class="gg-more-vertical-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div className="sidebar-wrapper scrollbar scrollbar-inner">
                            <div className="sidebar-content">
                                <ul className="nav nav-secondary">
                                    {/* Dashboard */}
                                    <li className="nav-item active">
                                        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Dashboard</p>
                                        </Link>
                                    </li>

                                    {/* Member Management */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("memberManagement")}
                                            className={`collapsed ${openDropdown === "memberManagement" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Members</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "memberManagement" ? "show" : ""}`} id="memberManagement">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/members" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Members List</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/visitors" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Visitors</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/pastmembers" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Past Members</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/children" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Children</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/prayer-req" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Prayer Requests</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Ministry Management */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("ministryManagement")}
                                            className={`collapsed ${openDropdown === "ministryManagement" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faChurch} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Ministries & Cell Groups</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "ministryManagement" ? "show" : ""}`} id="ministryManagement">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/ministries" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Ministries</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/joinrequests" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Requests to Join</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/cellgroups" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Cell Groups</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Event Management */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("eventManagement")}
                                            className={`collapsed ${openDropdown === "eventManagement" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Events</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "eventManagement" ? "show" : ""}`} id="eventManagement">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/events" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Event Registrations</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/volunteeropptunities" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Volunteer Tasks</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/attendance" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Attendance Tracking</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>



                                    {/* Giving & Contributions */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("givingContributions")}
                                            className={`collapsed ${openDropdown === "givingContributions" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faDonate} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Giving</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "givingContributions" ? "show" : ""}`} id="givingContributions">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/contributions" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Cash Contributions</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/donations" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Non-Cash Contributions</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/projects" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Categories</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Reports & Analytics */}
                                    <li className="nav-item">
                                        <Link
                                            type="button" // Prevents refreshing
                                            onClick={() => toggleDropdown("reportsAnalytics")}
                                            className={`collapsed ${openDropdown === "reportsAnalytics" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Media & Notifications</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "reportsAnalytics" ? "show" : ""}`} id="reportsAnalytics">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/sermons" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Sermons</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/notifications" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Notifications</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </li>

                                    {/* Admin Panel */}
                                    <li className="nav-item">
                                        <Link
                                            type="button"
                                            onClick={() => toggleDropdown("adminpanel")}
                                            className={`collapsed ${openDropdown === "adminpanel" ? "show" : ""} nav-link`}
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >
                                            <FontAwesomeIcon icon={faTools} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Settings</p>
                                            <span className="caret"></span>
                                        </Link>
                                        <div className={`collapse ${openDropdown === "adminpanel" ? "show" : ""}`} id="adminpanel">
                                            <ul className="nav nav-collapse">
                                                <li>
                                                    <Link to="/users" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Users</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/changepassword" style={{ textDecoration: 'none', color: '#fff' }}>
                                                        <span className="sub-item">Change Password</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Logout Option */}
                                    <li className="nav-item" style={{ marginTop: 'auto' }}>
                                        <Link
                                            to="/"
                                            onClick={handleLogout}
                                            className="nav-link"
                                            style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#fff' }}
                                        >

                                            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
                                            <p style={{ margin: 0 }}>Logout</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;
