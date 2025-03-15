import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "./config";
import Swal from 'sweetalert2';

const Notifications = () => {
    // Dummy data for ministries
    const [notificationData, setNotificationData] = useState([]);

    useEffect(() => {
        const asyncFetch = async () => {
            try {
                // const userId = await localStorage.getItem("UserID");

                let res = await fetch(`${API_URL}/notifications/`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let responseJson = await res.json();
                setNotificationData(responseJson);
                // setFilteredData(responseJson);
            } catch (error) {
                Swal.fire({
                    text: "Failed to load notifications. Check your internet connection!",
                    // icon: "error"
                });
            }
        }

        asyncFetch();

    }, []);

    return (
        <div>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Notifications
            </h4>
            <div className="block" style={{ textAlign: 'left', justifyContent: 'left',width: '100%' }}>
                {notificationData.map((notification) => (
                    <div
                        key={notification.id}
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
                            {notification.header}
                        </h5>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            <strong>Notice:</strong> {notification.content}
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                        Sent On: {notification.date.slice(0, 10)} {notification.time.slice(0, 5)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;