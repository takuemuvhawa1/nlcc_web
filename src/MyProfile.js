import React, { useEffect, useState } from "react";

const MyProfile = () => {
  // Dummy user data (replace with actual data fetching logic)
  const [userdata, setUserdata] = useState({
    UserAlias: "John Doe",
    UserGender: "Male",
    UserEmail: "johndoe@example.com",
    UserPhone: "+1234567890",
    UserAddress: "123 Main St, City, Country",
    UserZone: "Zone A",
    UserImg: "https://via.placeholder.com/150", // Placeholder image URL
    UserCellGroups: [{ SmallGroupName: "Young Adults" }],
    UserMinistries: [
      { MinistryName: "Worship Ministry" },
      { MinistryName: "Outreach Ministry" },
    ],
    UserNok: "Jane Doe",
    UserNokPhone: "+0987654321",
    UserNokRel: "Spouse",
    UserMariral: "Married",
    UserSpouse: "Jane Doe",
    UserSpousePhone: "+0987654321",
  });

  // Fetch user data (replace with your actual data fetching logic)
  useEffect(() => {
    // Simulate fetching user data from an API or local storage
    const fetchUserData = async () => {
      // Add your data fetching logic here
      console.log("Fetching user data...");
    };
    fetchUserData();
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerText}>My Profile</h1>
        <img
          src={userdata.UserImg}
          alt="User"
          style={styles.userImage}
        />
        <h2 style={styles.userName}>Hi! {userdata.UserAlias}</h2>
      </div>

      {/* Profile Details */}
      <div style={styles.detailsContainer}>
        {/* Gender */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Gender</span>
          <span style={styles.detailValue}>{userdata.UserGender}</span>
        </div>

        {/* Email */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Email</span>
          <span style={styles.detailValue}>{userdata.UserEmail}</span>
        </div>

        {/* Phone */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Phone</span>
          <span style={styles.detailValue}>{userdata.UserPhone}</span>
        </div>

        {/* Address */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Address</span>
          <span style={styles.detailValue}>{userdata.UserAddress}</span>
        </div>

        {/* Zone */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Zone</span>
          <span style={styles.detailValue}>{userdata.UserZone}</span>
        </div>

        {/* Cell Group */}
        {userdata.UserCellGroups.length > 0 && (
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Cell Group</span>
            <span style={styles.detailValue}>
              {userdata.UserCellGroups[0].SmallGroupName}
            </span>
          </div>
        )}

        {/* Ministries */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Ministries</span>
          <div style={styles.detailValue}>
            {userdata.UserMinistries.length > 0 ? (
              userdata.UserMinistries.map((ministry, index) => (
                <span key={index} style={styles.ministryItem}>
                  {ministry.MinistryName}
                </span>
              ))
            ) : (
              <span style={styles.noMinistryText}>None Joined</span>
            )}
          </div>
        </div>

        {/* Next of Kin */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Next of Kin</span>
          <span style={styles.detailValue}>{userdata.UserNok}</span>
        </div>

        {/* Next of Kin Phone */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Next of Kin Phone</span>
          <span style={styles.detailValue}>{userdata.UserNokPhone}</span>
        </div>

        {/* Next of Kin Relationship */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Next of Kin Relationship</span>
          <span style={styles.detailValue}>{userdata.UserNokRel}</span>
        </div>

        {/* Marital Status */}
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Marital Status</span>
          <span style={styles.detailValue}>{userdata.UserMariral}</span>
        </div>

        {/* Spouse Details (if married) */}
        {userdata.UserMariral === "Married" && (
          <>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Spouse Name</span>
              <span style={styles.detailValue}>{userdata.UserSpouse}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Spouse Phone</span>
              <span style={styles.detailValue}>{userdata.UserSpousePhone}</span>
            </div>
          </>
        )}
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
    background: "linear-gradient(180deg, #30303030, #ffffff, #30303050)",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  headerText: {
    fontSize: "24px",
    color: "#1a6363",
    marginBottom: "10px",
  },
  userImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  userName: {
    fontSize: "20px",
    color: "#000000",
  },
  detailsContainer: {
    width: "100%",
    maxWidth: "500px",
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #1a636350",
    padding: "10px 0",
  },
  detailLabel: {
    fontSize: "16px",
    color: "#000000",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "16px",
    color: "#1a6363",
    textAlign: "right",
  },
  ministryItem: {
    display: "block",
    marginBottom: "5px",
  },
  noMinistryText: {
    color: "#00000050",
  },
};

export default MyProfile;