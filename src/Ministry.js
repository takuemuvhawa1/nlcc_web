// import React, { useEffect, useState } from "react";
// import Swal from 'sweetalert2';

// const Ministry = () => {
//     // Dummy data for a single ministry
//     const [ministry, setMinistry] = useState({
//         id: "",
//         name: "",
//         description: "",
//         leader: [],
//         joined: false, // Set to false initially (not joined)
//         dateJoined: null, // Will be set when joined
//     });

//     const handleJoin = () => {
//         // Simulate joining the ministry
//         Swal.fire({
//             text: "Request to join sent!",
//             icon: "success"
//         });
//         setMinistry(prevMinistry => ({
//             ...prevMinistry,
//             joined: true,
//             dateJoined: new Date().toLocaleDateString(), // Set the current date as the join date
//         }));
//     };

//     const handleLeave = () => {
//         // Simulate leaving the ministry
//         Swal.fire({
//             text: "Request to leave sent!",
//             icon: "success"
//         });
//         setMinistry(prevMinistry => ({
//             ...prevMinistry,
//             joined: false,
//             dateJoined: null, // Reset the join date
//         }));
//     };

//     useEffect(() => {
//         const findFormData = async () => {
//             try {
//                 const slctdObj = await localStorage.getItem("selectedMinistry");
//                 const ministryObj = JSON.parse(slctdObj);

//                 if (ministryObj) {
//                     setMinistry({
//                         id: ministryObj.id,
//                         name: ministryObj.name,
//                         description: ministryObj.description,
//                         leaders: ministryObj.leaders,
//                         joined: ministryObj.joined,
//                     });

//                     console.log("Ministry data found");
//                 } else {
//                     console.log("No ministry data found");
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         findFormData();
//     }, []);

//     return (
//         <div>
//             <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
//                 Ministry Details
//             </h4>
//             <div style={{
//                 border: '1px solid #1a6363',
//                 borderRadius: '10px',
//                 padding: '15px',
//                 margin: '10px auto',
//                 maxWidth: '500px',
//                 backgroundColor: '#f9f9f9',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             }}>
//                 <h5 style={{ margin: '0', fontSize: '16px', color: '#1a6363' }}>
//                     {ministry.name}
//                 </h5>
//                 <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
//                     {ministry.description}
//                 </p>
//                 <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
//                     Leader: {ministry.leader}
//                 </p>
//                 {ministry.joined ? (
//                     <>
//                         {/* <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
//                             Date Joined: {ministry.dateJoined}
//                         </p> */}
//                         <button onClick={handleLeave} style={{
//                             backgroundColor: '#ff4d4d',
//                             color: '#ffffff',
//                             border: 'none',
//                             borderRadius: '5px',
//                             padding: '10px 20px',
//                             cursor: 'pointer',
//                             width: '100%',
//                         }}>
//                             Request to Leave
//                         </button>
//                     </>
//                 ) : (
//                     <button onClick={handleJoin} style={{
//                         backgroundColor: '#1a6363',
//                         color: '#ffffff',
//                         border: 'none',
//                         borderRadius: '5px',
//                         padding: '10px 20px',
//                         cursor: 'pointer',
//                         width: '100%',
//                     }}>
//                         Request to Join
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Ministry;

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const Ministry = () => {
    const [ministry, setMinistry] = useState({
        id: "",
        name: "",
        description: "",
        leaders: [],
        joined: false,
        dateJoined: null,
    });

    // Join/Leave handlers remain unchanged
    const handleJoin = () => {
        Swal.fire({ text: "Request to join sent!", icon: "success" });
        setMinistry(prev => ({
            ...prev,
            joined: true,
            dateJoined: new Date().toLocaleDateString(),
        }));
    };

    const handleLeave = () => {
        Swal.fire({ text: "Request to leave sent!", icon: "success" });
        setMinistry(prev => ({
            ...prev,
            joined: false,
            dateJoined: null,
        }));
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = localStorage.getItem("selectedMinistry");
                if (data) {
                    const parsed = JSON.parse(data);
                    setMinistry({
                        ...parsed,
                        leaders: parsed.leaders || [],
                    });
                }
            } catch (error) {
                console.error("Loading error:", error);
            }
        };
        loadData();
    }, []);

    return (
        <div>
            <h4 style={{ textAlign: 'center', fontSize: '17px', color: '#1a6363' }}>
                Ministry Details
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
                {/* Ministry Info Section */}
                <h5 style={{ margin: '0', fontSize: '16px', color: '#1a6363' }}>
                    {ministry.name}
                </h5>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                    {ministry.description}
                </p>

                {/* Leadership Section Integration */}
                <div className="row align-items-center">
                    <div className="col-auto">
                        <p style={{
                            margin: 0,
                            fontSize: "16px",
                            color: "#1a6363",
                            fontWeight: 500
                        }}>
                            Leader(s):
                        </p>
                    </div>
                    <div className="col">
                        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                            {ministry.leaders?.map((item) => (
                                <div key={item.leaderID} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start"
                                }}>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                        <span style={{
                                            fontFamily: "Arial, sans-serif",
                                            fontSize: "16px",
                                            color: "#1a6363",
                                            fontWeight: 500
                                        }}>
                                            {item.admin}
                                        </span>

                                    </div>

                                        <span style={{
                                            fontFamily: "Arial, sans-serif",
                                            fontSize: "14px",
                                            color: "#555",
                                            marginTop: "4px"
                                        }}>
                                            Tel: {item.adminphone}
                                        </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Join/Leave Button */}
                {ministry.joined ? (
                    <>
                        <button onClick={handleLeave} style={{
                            backgroundColor: '#ff4d4d',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            width: '100%',
                            marginTop: 15
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
                        marginTop: 15
                    }}>
                        Request to Join
                    </button>
                )}
            </div>
        </div>
    );
};

export default Ministry;