import React, { useState } from "react";
import About from "./About";
import Calender from "./Calender";
import Cellgroups from "./Cellgroups";
import Ministries from "./Ministries";
import PrayerReq from "./PrayerReq";
import Notifications from "./Notifications";

const Blank = () => {
    const [activeComponent, setActiveComponent] = useState("Refresh");
    const [searchQuery, setSearchQuery] = useState('');

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    const getButtonStyle = (component) => {
        return {
            marginBottom: '10px',
            marginRight: '10px',
            width: '200px',
            height: '45px',
            border: '1px solid #000000',
            borderRadius: '10px',
            borderWidth: '0px',
            backgroundColor: activeComponent === component ? '#1a6363' : '#B5D3CF',
            color: activeComponent === component ? '#ffffff' : '#000000',
        };
    };

    return (
        <>
            <html lang="en">
                <body>
                    {/* <!-- Begin page content --> */}
                    <div className="container-fluid">
                        {/* <!-- Home page --> */}
                        <div id="page-home" className="active mt-4">
                            <div className="col-lg-6">
                                <form className="nosubmit">
                                    <input className="nosubmit form-control" type="search" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                                </form>
                            </div>
                            <div className="block mt-4">
                                <center>
                                    <div className="outer" style={{ justifyContent: 'space-between', paddingInline: '8px' }}>
                                        <button style={getButtonStyle("About")} onClick={() => handleButtonClick("About")}>About</button>
                                        <button style={getButtonStyle("Ministries")} onClick={() => handleButtonClick("Ministries")}>Ministries</button>
                                        <button style={getButtonStyle("Calender")} onClick={() => handleButtonClick("Calender")}>Calender</button>
                                        <button style={getButtonStyle("Cellgroups")} onClick={() => handleButtonClick("Cellgroups")}>Cell Groups</button>
                                        <button style={getButtonStyle("PrayerReq")} onClick={() => handleButtonClick("PrayerReq")}>Prayer Requests</button>
                                        <button style={getButtonStyle("Refresh")} onClick={() => handleButtonClick("Refresh")}>Refresh</button>
                                    </div>
                                </center>
                            </div>
                        </div>

                        <div
                            id="page-account"
                            className="active"
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: '100%',
                                paddingHorizontal: '20px'
                            }}
                        >
                            {activeComponent === "About" && (
                                <div style={{ width: '100%', alignSelf: 'center' }}>
                                    <About />
                                </div>
                            )}
                            {activeComponent === "Ministries" && (
                                <div style={{ width: '100%', alignSelf: 'center' }}>
                                    <Ministries  searchQuery={searchQuery} />
                                </div>
                            )}
                            {activeComponent === "Calender" && (
                                <div style={{ width: '100%'}}>
                                    <Calender searchQuery={searchQuery} />
                                </div>
                            )}
                            {activeComponent === "Cellgroups" && (
                                <div style={{ width: '100%'}}>
                                    <Cellgroups searchQuery={searchQuery} />
                                </div>
                            )}
                            {activeComponent === "PrayerReq" && (
                                <div style={{ width: '100%'}}>
                                    <PrayerReq searchQuery={searchQuery} />
                                </div>
                            )}
                            {activeComponent === "Refresh" && (
                                <div style={{ width: '100%'}}>
                                    <Notifications searchQuery={searchQuery} />
                                </div>
                            )}
                        </div>

                    </div>
                    <div>
                        <br></br><br></br><br></br>
                    </div>

                    {/* <!-- Bottom Nav Bar --> */}
                    {/* <Footer /> */}
                </body>
            </html>
        </>
    );
};

export default Blank;