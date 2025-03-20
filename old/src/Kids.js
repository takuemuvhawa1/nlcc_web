import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import Swal from "sweetalert2";

const Kids = () => {
  // State for managing kids data
  const [kids, setKids] = useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState("New Member"); // "New Member" or "Update Member"
  const [currentKid, setCurrentKid] = useState({
    id: "",
    name: "",
    surname: "",
    dob: "",
    relationship: "",
    gender: "",
    dd: "",
    mm: "",
    yy: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Dummy data for kids (replace with actual API calls)
  const dummyKidsData = [
    {
      id: "1",
      name: "John",
      surname: "Doe",
      dob: "2015-05-15",
      relationship: "Son",
      gender: "M",
    },
    {
      id: "2",
      name: "Jane",
      surname: "Doe",
      dob: "2018-08-20",
      relationship: "Daughter",
      gender: "F",
    },
  ];

  useEffect(() => {
    const findFormData = async () => {
      try {
        setIsLoading(true);
        const memberId = localStorage.getItem("UserID");
        //alert(memberId);
        //const asynctoken = localStorage.getItem("Tkn");

        let res = await fetch(`${API_URL}/children/parent/${memberId}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsLoading(false);
        let responseJson = await res.json();
        setTableData(responseJson);
        console.log(responseJson);
      } catch (error) {
        console.log(error);
      }
    };

    findFormData();
  }, []);

  // Open modal for adding or editing a kid
  const openModal = (kid = null) => {
    if (kid) {
      setFormState("Update Member");
      setCurrentKid({
        id: kid.childID,
        name: kid.name,
        surname: kid.surname,
        dob: kid.dob,
        relationship: kid.relationship,
        gender: kid.gender,
        dd: kid.dob.split("-")[2],
        mm: kid.dob.split("-")[1],
        yy: kid.dob.split("-")[0],
      });
    } else {
      setFormState("New Member");
      setCurrentKid({
        id: "",
        name: "",
        surname: "",
        dob: "",
        relationship: "",
        gender: "",
        dd: "",
        mm: "",
        yy: "",
      });
    }
    setModalVisible(true);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !currentKid.name ||
      !currentKid.surname ||
      !currentKid.dd ||
      !currentKid.mm ||
      !currentKid.yy ||
      !currentKid.relationship ||
      !currentKid.gender
    ) {
      Swal.fire({
        text: "Registration failed, Fill all the fields",
        icon: "error",
      });
      return;
    }

    setIsSaving(true);
    const dat = currentKid.yy + "-" + currentKid.mm + "-" + currentKid.dd;
    const parID = localStorage.getItem("UserID");

    const memberObj = {
      parentID: parID,
      name: currentKid.name,
      surname: currentKid.surname,
      dob: dat,
      relationship: currentKid.relationship,
      gender: currentKid.gender,
    };
    let signinresponse = null;
    try {
      if (formState == "New Member") {
        signinresponse = await fetch(`${API_URL}/children`, {
          method: "post",
          body: JSON.stringify(memberObj),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        signinresponse = await fetch(`${API_URL}/children/${currentKid.id}`, {
          method: "put",
          body: JSON.stringify(memberObj),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.log(error)
    }
    

    setIsSaving(true);
    let resJson = await signinresponse.json();
    console.log(resJson);

    if (resJson.message == "Child record added successfully") {
      setModalVisible(false);
      setCurrentKid({
        id: "",
        name: "",
        surname: "",
        dob: "",
        relationship: "",
        gender: "",
        dd: "",
        mm: "",
        yy: "",
      });
      Swal.fire({
        text: "Member added succesfully",
        icon: "success",
      });
      const memberId = localStorage.getItem("UserID");

      //const asynctoken = localStorage.getItem("Tkn");

      let res = await fetch(`${API_URL}/children/parent/${memberId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let responseJson = await res.json();
      setTableData(responseJson);
      setFormState("New Member");
      return;
    } else if (resJson.message == "Child record updated successfully") {
      setModalVisible(false);
      setCurrentKid({
        id: "",
        name: "",
        surname: "",
        dob: "",
        relationship: "",
        gender: "",
        dd: "",
        mm: "",
        yy: "",
      });
      Swal.fire({
        text: "Member updated successfully",
        icon: "success",
      });
      const memberId = localStorage.getItem("UserID");

      //const asynctoken = await AsyncStorage.getItem("Tkn");

      let res = await fetch(`${API_URL}/children/parent/${memberId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let responseJson = await res.json();
      setTableData(responseJson);
      setFormState("New Member");
      return;
    } else {
      Swal.fire({
        text: "Saving failed, Try again or contact system admin",
        icon: "error",
      });
    }

  };

  // Handle deletion of a kid
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this kid?")) {
      let signinresponse = await fetch(`${API_URL}/children/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      let resJson = await signinresponse.json();
  
      console.log(resJson);
  
      if (resJson.message == "Child record deleted successfully") {
        setModalVisible(false);
        setCurrentKid({
          id: "",
          name: "",
          surname: "",
          dob: "",
          relationship: "",
          gender: "",
          dd: "",
          mm: "",
          yy: "",
        });
        Swal.fire({
          text: "Member record deleted successfully",
          icon: "success",
        });
        const memberId = localStorage.getItem("UserID");
  
        //const asynctoken = await AsyncStorage.getItem("Tkn");
  
        let res = await fetch(`${API_URL}/children/parent/${memberId}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        let responseJson = await res.json();
        setTableData(responseJson);
        setFormState("New Member");
        return;
      } else {
        Swal.fire({
          text: "Deleting failed, Try again or contact system admin",
          icon: "error",
        });
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Family Members (Kids)</h1>

      {/* Add New Member Button */}
      <button style={styles.addButton} onClick={() => openModal()}>
        + New Member
      </button>

      {/* Kids Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th style={{ textAlign :'center' }}>Edit</th>
            <th style={{ textAlign :'center' }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((kid) => (
            <tr key={kid.childID}>
              <td>{`${kid.name} ${kid.surname}`}</td>
              <td>{kid.gender === "M" ? "Male" : "Female"}</td>
              <td style={{ textAlign :'center' }}>
                <i onClick={() => openModal(kid)} className="material-icons" style={{ fontSize: '1.5rem' }}>edit</i>
              </td>
              <td style={{ textAlign :'center' }}>
                <i onClick={() => handleDelete(kid.childID)} className="material-icons" style={{ fontSize: '1.5rem' }}>clear</i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing a Kid */}
      {modalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h5>{formState}</h5>
            <div style={styles.formGroup}>
              <label style={{fontSize: '12px'}}>First Name</label>
              <input
                type="text"
                value={currentKid.name}
                onChange={(e) =>
                  setCurrentKid({ ...currentKid, name: e.target.value })
                }
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={{fontSize: '12px'}}>Surname</label>
              <input
                type="text"
                value={currentKid.surname}
                onChange={(e) =>
                  setCurrentKid({ ...currentKid, surname: e.target.value })
                }
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={{fontSize: '12px'}}>Gender</label>
              <select
                value={currentKid.gender}
                onChange={(e) =>
                  setCurrentKid({ ...currentKid, gender: e.target.value })
                }
                style={styles.input}
              >
                <option value=""></option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={{fontSize: '12px'}}>Date of Birth</label>
              <div style={styles.dateInputs}>
                <select
                  value={currentKid.dd}
                  onChange={(e) =>
                    setCurrentKid({ ...currentKid, dd: e.target.value })
                  }
                  style={styles.input}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={currentKid.mm}
                  onChange={(e) =>
                    setCurrentKid({ ...currentKid, mm: e.target.value })
                  }
                  style={styles.input}
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={currentKid.yy}
                  onChange={(e) =>
                    setCurrentKid({ ...currentKid, yy: e.target.value })
                  }
                  style={styles.input}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 25 }, (_, i) => (
                    <option key={i} value={2024 - i}>
                      {2024 - i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={{fontSize: '12px'}}>Relationship</label>
              <select
                value={currentKid.relationship}
                onChange={(e) =>
                  setCurrentKid({ ...currentKid, relationship: e.target.value })
                }
                style={styles.input}
              >
                <option value=""></option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="GrandSon">GrandSon</option>
                <option value="GrandDaughter">GrandDaughter</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
              </select>
            </div>
            <div style={styles.modalActions}>
              <button
                style={styles.cancelButton}
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
              <button
                style={styles.saveButton}
                onClick={handleSubmit}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    fontSize: "24px",
    color: "#1a6363",
    marginBottom: "20px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#1a6363",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#1a6363",
    color: "#fff",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    width: "400px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  dateInputs: {
    display: "flex",
    gap: "10px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#1a6363",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "1px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

export default Kids;
