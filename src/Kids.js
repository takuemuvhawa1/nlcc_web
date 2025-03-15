import React, { useState, useEffect } from "react";

const Kids = () => {
  // State for managing kids data
  const [kids, setKids] = useState([]);
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

  // Fetch kids data (replace with actual API call)
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setKids(dummyKidsData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Open modal for adding or editing a kid
  const openModal = (kid = null) => {
    if (kid) {
      setFormState("Update Member");
      setCurrentKid({
        id: kid.id,
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
  const handleSubmit = () => {
    if (
      !currentKid.name ||
      !currentKid.surname ||
      !currentKid.dd ||
      !currentKid.mm ||
      !currentKid.yy ||
      !currentKid.relationship ||
      !currentKid.gender
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const dob = `${currentKid.yy}-${currentKid.mm}-${currentKid.dd}`;
    const newKid = {
      id: currentKid.id || String(kids.length + 1), // Generate ID if new
      name: currentKid.name,
      surname: currentKid.surname,
      dob,
      relationship: currentKid.relationship,
      gender: currentKid.gender,
    };

    setIsLoading(true);
    setTimeout(() => {
      if (formState === "New Member") {
        setKids([...kids, newKid]);
      } else {
        setKids(kids.map((kid) => (kid.id === newKid.id ? newKid : kid)));
      }
      setModalVisible(false);
      setIsLoading(false);
    }, 1000);
  };

  // Handle deletion of a kid
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this kid?")) {
      setIsLoading(true);
      setTimeout(() => {
        setKids(kids.filter((kid) => kid.id !== id));
        setIsLoading(false);
      }, 1000);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {kids.map((kid) => (
            <tr key={kid.id}>
              <td>{`${kid.name} ${kid.surname}`}</td>
              <td>{kid.gender === "M" ? "Male" : "Female"}</td>
              <td>
                <button
                  style={styles.editButton}
                  onClick={() => openModal(kid)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(kid.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing a Kid */}
      {modalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{formState}</h2>
            <div style={styles.formGroup}>
              <label>First Name</label>
              <input
                type="text"
                value={currentKid.name}
                onChange={(e) =>
                  setCurrentKid({ ...currentKid, name: e.target.value })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label>Surname</label>
              <input
                type="text"
                value={currentKid.surname}
                onChange={(e) =>
                  setCurrentKid({ ...currentKid, surname: e.target.value })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label>Gender</label>
              <select
                value={currentKid.gender}
                onChange={(e) =>
                  setCurrentKid({ ...currentKid, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label>Date of Birth</label>
              <div style={styles.dateInputs}>
                <select
                  value={currentKid.dd}
                  onChange={(e) =>
                    setCurrentKid({ ...currentKid, dd: e.target.value })
                  }
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
              <label>Relationship</label>
              <select
                value={currentKid.relationship}
                onChange={(e) =>
                  setCurrentKid({ ...currentKid, relationship: e.target.value })
                }
              >
                <option value="">Select Relationship</option>
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
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
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
};

export default Kids;