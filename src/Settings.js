import React, { useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "./config";
import axios from 'axios';

const Settings = () => {
  // State for password inputs
  const [file, setFile] = useState();
  const [hidePin, setHidePin] = useState(true);
  const [hideNewPin, setHideNewPin] = useState(true);
  const [hideConfirmNewPin, setHideConfirmNewPin] = useState(true);

  const [inputs, setInputs] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

  // State for next of kin and marital status
  const [nok, setNok] = useState({
    address: "",
    name: "",
    phone: "",
    relationship: "",
    marital: "",
    spouseName: "",
    spousePhone: "",
  });

  // State for preferred communication
  const [isMailSelected, setIsMailSelected] = useState(false);
  const [isPhoneSelected, setIsPhoneSelected] = useState(false);

  // State for profile image
  const [profileImage, setProfileImage] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  // State for loading indicators
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [isLoadingCommunication, setIsLoadingCommunication] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === "old") setHidePin(!hidePin);
    if (field === "new") setHideNewPin(!hideNewPin);
    if (field === "confirm") setHideConfirmNewPin(!hideConfirmNewPin);
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (
      !inputs.email ||
      !inputs.oldPassword ||
      !inputs.newPassword ||
      !inputs.confirmNewPassword
    ) {
      Swal.fire({
        text: "Submission Error. Fill all the fields before proceeding",
        icon: "error",
      });
      return;
    }
    if (inputs.newPassword !== inputs.confirmNewPassword) {
      Swal.fire({
        text: "Submission Error. Password confirmation is wrong",
        icon: "error",
      });
      return;
    }

    const obj = {
      email: inputs.email,
      oldPassword: inputs.oldPassword,
      newPassword: inputs.newPassword,
    }

    setIsLoadingPassword(true);
    let signinresponse = await fetch(`${API_URL}/onboarding/resetpassword`, {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await signinresponse.text();

    console.log(resJson);

    if (resJson.message == "Invalid email or password") {
      Swal.fire({
        text: "Submission Error. The sent email or phone is invalid",
        icon: "error",
      });
      setIsLoadingPassword(false);
      return;
    }

    if (resJson.message == "Password reset successfully") {
      setInputs({
        email: "",
        oldPassword: "",
        newPassword: "",
        cnnewPassword: "",
      });
      setIsLoadingPassword(false);
      Swal.fire({
        text: "Saving successfull",
        icon: "success",
      });
    }
  };

  // Handle preferred communication update
  const handleCommunicationUpdate = async () => {

    const userId = localStorage.getItem("UserID");
    setIsLoadingCommunication(true);

    let signinresponse = await fetch(
      `${API_URL}/members/preferred/comm/${userId}`,
      {
        method: "put",
        body: JSON.stringify({
          email: isMailSelected,
          phone: isPhoneSelected,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let resJson = await signinresponse.json();

    console.log(resJson);
    setIsLoadingCommunication(false);

    if (resJson.message == "Member details updated successfully") {
      Swal.fire({
        text: "Member details updated successfully",
        icon: "success",
      });
    } else {
      Swal.fire({
        text: "Member details did not update successfully. Contact sysem admin",
        icon: "error",
      });
    }
  };

  // Handle next of kin and marital status update
  const handleDetailsUpdate = () => {
    setIsLoadingDetails(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoadingDetails(false);
      alert("Details updated successfully.");
    }, 2000);
  };

  // Handle profile image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsImageUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setIsImageUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImgUpload = async () => {
    if (file == "") {
      Swal.fire({
        text: "Submission Error. Select the image first before proceeding",
        icon: "error",
      });
      return;
    }

    const UserID = localStorage.getItem("UserID");
    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    await axios
      .post(`${API_URL}/upload/${UserID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        console.log("Pik" + response.data.Filename);

        if (response.data.result.message == "Member updated successfully") {
          const setnewimg = async () => {
           localStorage.setItem("UserImg", response.data.Filename);
          };
          setnewimg();
          setFile("");
          setIsImageUploading(false);
          localStorage.setItem("UserImg", response.data.Filename);
          Swal.fire({
            text: "Successfull. Image uploaded successfully",
            icon: "success",
          });
          return;
        }
      })
      .catch((error) => {
        setIsImageUploading(false);
        console.log(error.response.data.message);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Settings</h1>

      {/* Profile Picture Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Change Profile Picture</h2>
        <div
          onClick={() => document.getElementById("fileInput").click()}
          style={styles.profileImageContainer}
        >
          {file ? (
            <>
              <img src={URL.createObjectURL(file)} style={styles.profileImage} />
            </>
          ) : (
            <div style={styles.profileImagePlaceholder}>Profile Image</div>
          )}
          <input id="fileInput" type="file" onChange={handleChange} hidden />
        </div>
        <button
          style={styles.button}
          onClick={() => handleImgUpload()}
          disabled={isImageUploading}
        >
          {isImageUploading ? "Uploading..." : "Upload New Image"}
        </button>
      </div>

      {/* Change Password Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Change Password</h2>
        <input
          type="email"
          placeholder="Email or phone"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          style={styles.input}
        />
        <div style={styles.passwordInput}>
          <input
            type={hidePin ? "password" : "text"}
            placeholder="Current Password"
            value={inputs.oldPassword}
            onChange={(e) =>
              setInputs({ ...inputs, oldPassword: e.target.value })
            }
            style={styles.input}
          />
          <span
            style={styles.toggleVisibility}
            onClick={() => togglePasswordVisibility("old")}
          >
            {hidePin ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>
        <div style={styles.passwordInput}>
          <input
            type={hideNewPin ? "password" : "text"}
            placeholder="New Password"
            value={inputs.newPassword}
            onChange={(e) =>
              setInputs({ ...inputs, newPassword: e.target.value })
            }
            style={styles.input}
          />
          <span
            style={styles.toggleVisibility}
            onClick={() => togglePasswordVisibility("new")}
          >
            {hideNewPin ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>
        <div style={styles.passwordInput}>
          <input
            type={hideConfirmNewPin ? "password" : "text"}
            placeholder="Confirm New Password"
            value={inputs.confirmNewPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmNewPassword: e.target.value })
            }
            style={styles.input}
          />
          <span
            style={styles.toggleVisibility}
            onClick={() => togglePasswordVisibility("confirm")}
          >
            {hideConfirmNewPin ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>
        <button
          style={styles.button}
          onClick={handlePasswordChange}
          disabled={isLoadingPassword}
        >
          {isLoadingPassword ? "Saving..." : "Save New Password"}
        </button>
      </div>

      {/* Preferred Communication Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Preferred Communication</h2>
        <div style={styles.checkboxContainer}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isMailSelected}
              onChange={() => setIsMailSelected(!isMailSelected)}
            />
            Email
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isPhoneSelected}
              onChange={() => setIsPhoneSelected(!isPhoneSelected)}
            />
            Phone
          </label>
        </div>
        <button
          style={styles.button}
          onClick={handleCommunicationUpdate}
          disabled={isLoadingCommunication}
        >
          {isLoadingCommunication ? "Updating..." : "Update Preferences"}
        </button>
      </div>

      {/* Next of Kin and Marital Status Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Next of Kin & Marital Status</h2>
        <input
          type="text"
          placeholder="Address"
          value={nok.address}
          onChange={(e) => setNok({ ...nok, address: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Next of Kin Name"
          value={nok.name}
          onChange={(e) => setNok({ ...nok, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Next of Kin Phone"
          value={nok.phone}
          onChange={(e) => setNok({ ...nok, phone: e.target.value })}
          style={styles.input}
        />
        <select
          value={nok.relationship}
          onChange={(e) => setNok({ ...nok, relationship: e.target.value })}
          style={styles.input}
        >
          <option value="">Relationship</option>
          <option value="Mother">Mother</option>
          <option value="Father">Father</option>
          <option value="Sister">Sister</option>
          <option value="Brother">Brother</option>
          <option value="Aunt">Aunt</option>
        </select>
        <select
          value={nok.marital}
          onChange={(e) => setNok({ ...nok, marital: e.target.value })}
          style={styles.input}
        >
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Engaged">Engaged</option>
          <option value="Widowed">Widowed</option>
        </select>
        {nok.marital === "Married" && (
          <>
            <input
              type="text"
              placeholder="Spouse Name"
              value={nok.spouseName}
              onChange={(e) => setNok({ ...nok, spouseName: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Spouse Phone"
              value={nok.spousePhone}
              onChange={(e) => setNok({ ...nok, spousePhone: e.target.value })}
              style={styles.input}
            />
          </>
        )}
        <button
          style={styles.button}
          onClick={handleDetailsUpdate}
          disabled={isLoadingDetails}
        >
          {isLoadingDetails ? "Updating..." : "Update Details"}
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    marginBottom: "60px",
  },
  header: {
    fontSize: "24px",
    color: "#1a6363",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#1a6363",
    marginBottom: "10px",
  },
  profileImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  profileImagePlaceholder: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#666",
  },
  fileInput: {
    display: "none",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  passwordInput: {
    position: "relative",
    width: "100%",
  },
  toggleVisibility: {
    position: "absolute",
    right: "10px",
    top: "10px",
    cursor: "pointer",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1a6363",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Settings;
