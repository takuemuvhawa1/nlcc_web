import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "./config";
import Swal from 'sweetalert2';

const PrayerReq = () => {
    const [prayerRequest, setPrayerRequest] = useState("");
    const [showSentRequests, setShowSentRequests] = useState(false);
    const [sentRequests, setSentRequests] = useState([]);

    useEffect(() => {
        const asyncFetch = async () => {
            try {
                // const userId = await localStorage.getItem("UserID");

                let res = await fetch(`${API_URL}/prayer-req/${3}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let responseJson = await res.json();
                setSentRequests(responseJson);
                //   setFilteredData(responseJson);
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

    const handleSendPrayerRequest = () => {
        if (prayerRequest.trim() === "") {
            alert("Please enter a prayer request.");
            return;
        }
        const newRequest = {
            id: sentRequests.length + 1,
            request: prayerRequest,
            date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        };
        setSentRequests([...sentRequests, newRequest]);
        setPrayerRequest("");
        alert("Prayer request sent successfully!");
    };

    const toggleView = () => {
        setShowSentRequests(!showSentRequests);
    };

    return (
        <div>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Prayer Requests
            </h4>
            <div className="block" style={{ textAlign: 'left', justifyContent: 'left' }}>
                {/* <p style={{ textAlign: 'center', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                    "The Bible commands us to pray for one another, “Therefore, confess your sins to one another and pray for one another, that you may be healed. Again, prayer lightens burdens, therefore praying for one another is a powerful way for us to bear one another's burdens. It is a loving act to pray for someone."
                </p> */}

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <button
                        style={{
                            padding: '10px 20px',
                            border: '1px solid #1a6363',
                            borderRadius: '5px',
                            backgroundColor: showSentRequests ? '#fff' : '#1a6363',
                            color: showSentRequests ? '#1a6363' : '#fff',
                            cursor: 'pointer',
                            marginRight: '10px',
                        }}
                        onClick={() => setShowSentRequests(false)}
                    >
                        Send New Request
                    </button>
                    <button
                        style={{
                            padding: '10px 20px',
                            border: '1px solid #1a6363',
                            borderRadius: '5px',
                            backgroundColor: showSentRequests ? '#1a6363' : '#fff',
                            color: showSentRequests ? '#fff' : '#1a6363',
                            cursor: 'pointer',
                        }}
                        onClick={() => setShowSentRequests(true)}
                    >
                        View Sent Requests
                    </button>
                </div>

                {showSentRequests ? (
                    <div>
                        <h5 style={{ textAlign: 'center', fontSize: '16px', color: '#1a6363' }}>
                            Sent Prayer Requests
                        </h5>
                        {sentRequests.map((request) => (
                            <div
                                key={request.id}
                                style={{
                                    border: '1px solid #1a6363',
                                    borderRadius: '10px',
                                    padding: '15px',
                                    margin: '10px 0',
                                    backgroundColor: '#f9f9f9',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>
                                    <strong>Request:</strong> {request.requestnotes}
                                </p>
                                <p style={{ margin: '5px 0', fontSize: '12px', color: '#777' }}>
                                    <strong>Date:</strong> {request.requestedon.slice(0, 10)}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <textarea
                            value={prayerRequest}
                            onChange={(e) => setPrayerRequest(e.target.value)}
                            placeholder="Enter your prayer request..."
                            style={{
                                width: '80%',
                                height: '100px',
                                padding: '10px',
                                border: '1px solid #1a6363',
                                borderRadius: '5px',
                                fontSize: '14px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <button
                            style={{
                                padding: '10px 20px',
                                border: '1px solid #1a6363',
                                borderRadius: '5px',
                                backgroundColor: '#1a6363',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                            onClick={handleSendPrayerRequest}
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrayerReq;