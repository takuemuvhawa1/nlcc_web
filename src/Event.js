import React, { useState } from "react";
import Swal from 'sweetalert2';

const Event = () => {
    // Dummy data for a single event
    const [event, setEvent] = useState({
        id: 1,
        theme: "Annual Church Conference",
        title: "Building a Stronger Community",
        startDate: "2023-11-01",
        endDate: "2023-11-03",
        joined: false, 
        dateJoined: null, 
    });

    const handleJoin = () => {
        Swal.fire({
            text: "Request to join sent!",
            icon: "success"
        });
        setEvent(prevEvent => ({
            ...prevEvent,
            joined: true,
            dateJoined: new Date().toLocaleDateString(), 
        }));
    };

    const handleLeave = () => {
        Swal.fire({
            text: "Request to leave sent!",
            icon: "success"
        });
        setEvent(prevEvent => ({
            ...prevEvent,
            joined: false,
            dateJoined: null, 
        }));
    };

    return (
        <div>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Event Details
            </h4>
            <div style={{
                border: '1px solid #1a6363',
                borderRadius: '10px',
                padding: '15px',
                margin: '10px auto',
                maxWidth: '500px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
                <h5 style={{ margin: '0', fontSize: '16px', color: '#1a6363' }}>
                    {event.theme}
                </h5>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                    Title: {event.title}
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                    Starting Date: {event.startDate}
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                    Ending Date: {event.endDate}
                </p>
                {event.joined ? (
                    <>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            Date Joined: {event.dateJoined}
                        </p>
                        <button onClick={handleLeave} style={{
                            backgroundColor: '#ff4d4d',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            width: '100%',
                        }}>
                            Request to Leave
                        </button>
                    </>
                ) : (
                    <button onClick={handleJoin} style={{
                        backgroundColor: '#1a6363',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        width: '100%',
                    }}>
                        Request to Join
                    </button>
                )}
            </div>
        </div>
    );
};

export default Event;