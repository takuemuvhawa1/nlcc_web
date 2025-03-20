import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const Cellgroup = () => {
    const [cellgroup, setCellgroup] = useState({
        id: "",
        name: "",
        description: "",
        leaders: [],
        joined: false,
        dateJoined: null,
    });

    useEffect(() => {
        const findFormData = async () => {
            try {
                const slctdObj = await localStorage.getItem("SelectedGroup");
                const ministryObj = JSON.parse(slctdObj);

                if (ministryObj) {
                    setCellgroup({
                        id: ministryObj.id,
                        name: ministryObj.name,
                        description: ministryObj.description,
                        admin: ministryObj.admin,
                        adminphone: ministryObj.adminphone,
                        joined: ministryObj.joined,
                    });

                    console.log("Cell data found");
                } else {
                    console.log("No cell data found");
                }
            } catch (error) {
                console.log(error);
            }
        };

        findFormData();

    }, []);

    const handleJoin = () => {
        // Simulate joining the cell group
        Swal.fire({
            text: "Request to join sent!",
            icon: "success"
        });
        setCellgroup(prevCellgroup => ({
            ...prevCellgroup,
            joined: true,
            dateJoined: new Date().toLocaleDateString(), // Set the current date as the join date
        }));
    };

    const handleLeave = () => {
        // Simulate leaving the cell group
        Swal.fire({
            text: "Request to leave sent!",
            icon: "success"
        });
        setCellgroup(prevCellgroup => ({
            ...prevCellgroup,
            joined: false,
            dateJoined: null, // Reset the join date
        }));
    };

    return (
        <div style={{ paddingInline: '10px' }}>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Cell Group Details
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
                    {cellgroup.name}
                </h5>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                    {cellgroup.description}
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                    {/* Leader: {cellgroup.leader} */}
                    Leader: &nbsp; Pastor admin <b></b>
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                    {/* Leader: {cellgroup.leader} */}
                    Contact: 0789700021
                </p>

                {cellgroup.joined ? (
                    <>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            Date Joined: {cellgroup.dateJoined}
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

export default Cellgroup;