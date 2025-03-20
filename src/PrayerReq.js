import React from "react";
import { useState, useEffect, useMemo } from "react";
import { API_URL } from "./config";
import Swal from 'sweetalert2';

const PrayerReq = ({ searchQuery }) => {
    const [prayerRequest, setPrayerRequest] = useState("");
    const [showSentRequests, setShowSentRequests] = useState(false);
    const [sentRequests, setSentRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const asyncFetch = async () => {
            try {
                const userId = await localStorage.getItem("UserID");

                let res = await fetch(`${API_URL}/prayer-req/${userId}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let responseJson = await res.json();
                setSentRequests(responseJson);
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

    const handleSendPrayerRequest = async () => {
        if (prayerRequest == "") {
            Swal.fire({
                text: "Sending failed. Type in the prayer request first",
                icon: "error",
            });
            return;
        }
        try {
            const userId = localStorage.getItem("UserID");
            setIsLoading(true);
            const response = await fetch(`${API_URL}/prayer-req`, {
                method: "post",
                body: JSON.stringify({
                    MemberID: userId,
                    requestnotes: prayerRequest,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let resJson = await response.json();
            setIsLoading(false);

            console.log(resJson);

            if (resJson.message == "Prayer request added successfully") {
                setPrayerRequest("");
                Swal.fire({
                    text: "Prayer request sent successfully",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    text: "Failed to send. Contact system admin!",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error sending request:", error);
            Swal.fire({
                text: "Failed to send. Check your internet connection!",
                icon: "error",
            });
        }
    };

    // Filtered data calculation
    const filteredData = useMemo(() => {
        if (!searchQuery) return sentRequests;

        const query = searchQuery.toLowerCase();
        return sentRequests.filter(request =>
            request.requestnotes?.toLowerCase().includes(query)
        );
    }, [sentRequests, searchQuery]);

    const toggleView = () => {
        setShowSentRequests(!showSentRequests);
    };

    return (
        <div>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Prayer Requests
            </h4>
            <div className="block" style={{ textAlign: 'center', justifyContent: 'center' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', width: '100%', marginTop: '20px' }}>
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
                        {filteredData.map((request) => (
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
                    <div style={{ textAlign: 'center', flexDirection: 'column', width: '100%' }}>
                        <textarea
                            value={prayerRequest}
                            onChange={(e) => setPrayerRequest(e.target.value)}
                            placeholder="Enter your prayer request..."
                            style={{
                                width: '100%',
                                height: '100px',
                                padding: '10px',
                                border: '1px solid #1a6363',
                                borderRadius: '5px',
                                fontSize: '14px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', width: '100%' }}>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    border: '1px solid #1a6363',
                                    borderRadius: '5px',
                                    backgroundColor: '#1a6363',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    width: '145px',
                                    alignSelf: 'flex-end'
                                }}
                                onClick={() => handleSendPrayerRequest()}
                            >
                                Send
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrayerReq;