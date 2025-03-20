import React, { useState, useEffect } from "react";
import { API_URL } from "./config";

const Contributions = () => {
    // Dummy data for cash contributions
    const [cashContributions, setCashContributions] = useState([]);

    // Dummy data for non-cash contributions
    const [nonCashContributions, setNonCashContributions] = useState([]);

    const [showCashContributions, setShowCashContributions] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        const cashContributions = async () => {
            //Call API HERE
            try {

                const userId = await localStorage.getItem("UserID");

                let res = await fetch(`${API_URL}/contributions/with-projects/${userId}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let responseJson = await res.json();
                setCashContributions(responseJson);
            } catch (error) {
                console.log(error);
            }
        };

        const nonCashContributions = async () => {
            //Call API HERE
            try {

                const userId = await localStorage.getItem("UserID");

                let res = await fetch(`${API_URL}/donations/member/${userId}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let responseJson = await res.json();
                setNonCashContributions(responseJson);
            } catch (error) {
                console.log(error);
            }
        };

        cashContributions();
        nonCashContributions();
    }, []);

    // Toggle between cash and non-cash contributions
    const toggleContributions = () => {
        setShowCashContributions(!showCashContributions);
    };

    // Filter contributions based on the search query
    const filteredContributions = showCashContributions
        ? cashContributions.filter((contribution) =>
            contribution.ProjectName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : nonCashContributions.filter((contribution) =>
            contribution.item.toLowerCase().includes(searchQuery.toLowerCase())
        );



    return (
        <div style={styles.container}>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Contributions
            </h4>
            {/* Toggle Button */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                    onClick={toggleContributions}
                    style={{
                        backgroundColor: '#1a6363',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        width: '344px'
                    }}
                >
                    {showCashContributions ? "Switch to Non-Cash Contributions" : "Switch to Cash Contributions"}
                </button>
            </div>
            {/* Search Bar */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder={`Search ${showCashContributions ? "cash contributions" : "non-cash contributions"}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '80%',
                        maxWidth: '500px',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #1a6363',
                        fontSize: '14px',
                        width: '344px'
                    }}
                />
            </div>
            {/* List of Contributions */}
            <div style={{ margin: '0 auto', maxWidth: '500px', width: '100%', marginBottom: "115px" }}>
                {filteredContributions.map((contribution) => (
                    <div
                        key={contribution.id}
                        style={{
                            border: '1px solid #1a6363',
                            borderRadius: '5px',
                            padding: '15px',
                            margin: '10px 0',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        {showCashContributions ? (
                            <>
                                <h5 style={{ margin: '0', fontSize: '16px', color: '#1a6363' }}>
                                    {contribution.ProjectName}
                                </h5>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                                    Amount: {contribution.Amount} {contribution.currency}
                                </p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                                    Date: {contribution.Date.slice(0, 10)}
                                </p>
                            </>
                        ) : (
                            <>
                                <h5 style={{ margin: '0', fontSize: '16px', color: '#1a6363' }}>
                                    {contribution.item}
                                </h5>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                                    Reason: {contribution.reason}
                                </p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                                    Date: {contribution.date.slice(0, 10)}
                                </p>
                            </>
                        )}
                    </div>
                ))}
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
        width: '100%'
        // // backgroundColor: "#f5f5f5",
        // backgroundColor: "#fff",
        // minHeight: "100vh",
    },
};


export default Contributions;