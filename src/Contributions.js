import React, { useState } from "react";

const Contributions = () => {
    // Dummy data for cash contributions
    const cashContributions = [
        {
            id: 1,
            category: "Tithe",
            amount: 100,
            currency: "USD",
            date: "2023-10-01",
        },
        {
            id: 2,
            category: "Offering",
            amount: 50,
            currency: "USD",
            date: "2023-10-08",
        },
        {
            id: 3,
            category: "Building Fund",
            amount: 200,
            currency: "USD",
            date: "2023-10-15",
        },
    ];

    // Dummy data for non-cash contributions
    const nonCashContributions = [
        {
            id: 1,
            item: "Bibles",
            reason: "For Sunday School",
            date: "2023-10-01",
        },
        {
            id: 2,
            item: "Chairs",
            reason: "For Church Events",
            date: "2023-10-08",
        },
        {
            id: 3,
            item: "Sound System",
            reason: "For Worship Team",
            date: "2023-10-15",
        },
    ];

    const [showCashContributions, setShowCashContributions] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Toggle between cash and non-cash contributions
    const toggleContributions = () => {
        setShowCashContributions(!showCashContributions);
    };

    // Filter contributions based on the search query
    const filteredContributions = showCashContributions
        ? cashContributions.filter((contribution) =>
              contribution.category.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div style={{ margin: '0 auto', maxWidth: '500px', width: '100%' }}>
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
                                    {contribution.category}
                                </h5>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                                    Amount: {contribution.amount} {contribution.currency}
                                </p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                                    Date: {contribution.date}
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
                                    Date: {contribution.date}
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