import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "./config";
import Swal from 'sweetalert2';

const Calender = () => {
    // Dummy data for calendar events
    const [calendarEvents, setCalendarEvents] = useState([]);
    useEffect(() => {
        const asyncFetch = async () => {
            try {
                // const userId = await localStorage.getItem("UserID");

                let res = await fetch(`${API_URL}/events-tasks`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let responseJson = await res.json();
                setCalendarEvents(responseJson);
                // setFilteredData(responseJson);
            } catch (error) {
                console.error('Error deleting child:', error);
                Swal.fire({
                    text: "Failed to load ministries. Check your internet connection!",
                    // icon: "error"
                });
            }
        }

        asyncFetch();

    }, []);

    return (
        <div>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                View events and church services part of our calendar
            </h4>
            <div className="block">
                {calendarEvents.map((event) => (
                    <div
                        key={event.id}
                        style={{
                            border: '1px solid #1a6363',
                            borderRadius: '10px',
                            padding: '15px',
                            margin: '10px 0',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h5 style={{ margin: '0', fontSize: '16px', color: '#1a6363' }}>
                            {event.type}
                        </h5>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            {event.theme}
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            <strong>Date:</strong> {event.date}
                        </p>
                    </div>
                ))}
            </div>
            <br></br>
        </div>
    );
};

export default Calender;