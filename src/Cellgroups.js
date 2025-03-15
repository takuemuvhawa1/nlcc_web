import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import Swal from 'sweetalert2';

const Cellgroups = () => {

    const [cellGroupsData, setCellGroupsData] = useState([]);
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
                // const userId = await localStorage.getItem("UserID");

                let res = await fetch(`${API_URL}/smallgroups/small-groups/${3}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let responseJson = await res.json();
                setCellGroupsData(responseJson);
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

    const handleCardClick = (cellObj) => {
        localStorage.setItem("SelectedGroup", JSON.stringify(cellObj));
        navigate(`/cellgroup`);
    };


    return (
        <div>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Be part of a Home Group
            </h4>
            <div className="block">
                {cellGroupsData.map((group) => (
                    <div
                        key={group.id}
                        style={{
                            border: '1px solid #1a6363',
                            borderRadius: '10px',
                            padding: '15px',
                            margin: '10px 0',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            ...(hoveredCard === group.id && hoverStyle)
                        }}
                        onMouseEnter={() => setHoveredCard(group.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => handleCardClick(group)}
                    >
                        <h5 style={{ margin: '0', fontSize: '16px', color: '#1a6363' }}>
                            {group.name}
                        </h5>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            <strong>Address:</strong> {group.location}
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            {group.joined ? "Joined" : "Not Joined"}
                        </p>
                    </div>
                ))}
            </div>
            <br></br>
        </div>
    );
};

export default Cellgroups;