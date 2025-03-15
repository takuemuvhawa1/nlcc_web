import React, { useState } from "react";

const Sermons = () => {
    // Dummy data for sermons
    const [sermons, setSermons] = useState([
        {
            id: 1,
            title: "The Power of Faith",
            date: "2023-10-01",
            link: "https://www.youtube.com/watch?v=example1",
        },
        {
            id: 2,
            title: "Living a Purposeful Life",
            date: "2023-10-08",
            link: "https://www.youtube.com/watch?v=example2",
        },
        {
            id: 3,
            title: "Overcoming Challenges",
            date: "2023-10-15",
            link: "https://www.youtube.com/watch?v=example3",
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");

    // Filter sermons based on the search query
    const filteredSermons = sermons.filter((sermon) =>
        sermon.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Sermons
            </h4>
            {/* Search Bar */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search sermons..."
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
            {/* List of Sermons */}
            <div style={{ margin: '0 auto', maxWidth: '500px', width: '100%' }}>
                {filteredSermons.map((sermon) => (
                    <div
                        key={sermon.id}
                        style={{
                            border: '1px solid #1a6363',
                            borderRadius: '5px',
                            padding: '15px',
                            margin: '10px 0',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h5 style={{ margin: '0', fontSize: '16px', color: '#1a6363' }}>
                            {sermon.title}
                        </h5>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            Date: {sermon.date}
                        </p>
                        <a
                            href={sermon.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                backgroundColor: '#1a6363',
                                color: '#ffffff',
                                textDecoration: 'none',
                                padding: '8px 15px',
                                borderRadius: '5px',
                                fontSize: '14px',
                                marginTop: '10px',
                            }}
                        >
                            Watch on YouTube
                        </a>
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

export default Sermons;