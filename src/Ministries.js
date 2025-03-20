import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import Swal from 'sweetalert2';

const Ministries = ({ searchQuery }) => {

    const [ministriesData, setMinistriesData] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate();

    // Hover state style
    const hoverStyle = {
        backgroundColor: '#f0f0f0',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
    };


    useEffect(() => {
        const asyncFetch = async () => {
            try {
                const userId = await localStorage.getItem("UserID");

                let res = await fetch(`${API_URL}/ministries/ministry/${userId}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let responseJson = await res.json();
                setMinistriesData(responseJson);
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

    // Filtered data calculation
    const filteredData = useMemo(() => {
        if (!searchQuery) return ministriesData;

        const query = searchQuery.toLowerCase();
        return ministriesData.filter(ministry =>
            ministry.name.toLowerCase().includes(query)
        );
    }, [ministriesData, searchQuery]);

    const handleCardClick = (ministry) => {
        localStorage.setItem("selectedMinistry", JSON.stringify(ministry));
        navigate(`/ministry`);
    };

    return (
        <div>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Be part of different ministries available
            </h4>
            <div className="block"
                style={{ textAlign: 'left', justifyContent: 'left' }}>
                {filteredData.map((ministry) => (
                    <div
                        key={ministry.id}
                        style={{
                            border: '1px solid #1a6363',
                            borderRadius: '10px',
                            padding: '15px',
                            margin: '10px 0',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            ...(hoveredCard === ministry.id && hoverStyle)
                        }}
                        onMouseEnter={() => setHoveredCard(ministry.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => handleCardClick(ministry)}
                    >
                        <h5 style={{ margin: '0', fontSize: '16px', color: '#1a6363' }}>
                            {ministry.name}
                        </h5>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            {ministry.joined ? "Joined" : "Not Joined"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ministries;