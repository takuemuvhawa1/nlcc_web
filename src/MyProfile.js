import React, { useEffect, useState } from "react";

const MyProfile = () => {
  // Dummy user data (replace with actual data fetching logic)
  const [userdata, setUserdata] = React.useState({
    Tkn: "",
    UserID: "",
    UserAlias: "",
    UserGender: "",
    UserEmail: "",
    UserPhone: "",
    UserAddress: "",
    UserNok: "",
    UserNokPhone: "",
    UserNokRel: "",
    UserMariral: "",
    UserSpouse: "",
    UserSpousePhone: "",
    UserZone: "",
    UserImg: "",
    UserMinistries: [],
    UserCellGroups: [],
  });


  // Fetch user data (replace with your actual data fetching logic)
  useEffect(() => {
    const asyncFetch = async () => {
      const Tkn = localStorage.getItem("Tkn");
      const UserID = localStorage.getItem("UserID");
      const UserAlias = localStorage.getItem("UserAlias");
      const UserGender = localStorage.getItem("UserGender");
      const UserEmail = localStorage.getItem("UserEmail");
      const UserPhone = localStorage.getItem("UserPhone");
      const UserAddress = localStorage.getItem("UserAddress");
      const UserZone = localStorage.getItem("UserZone");
      const UserImg = localStorage.getItem("UserImg");
      const UserNok = localStorage.getItem("UserNok");
      const UserNokPhone = localStorage.getItem("UserNokPhone");
      const UserNokRel = localStorage.getItem("UserNokRel");
      const UserMariral = localStorage.getItem("UserMarital");
      const UserSpouse = localStorage.getItem("UserSpouse");
      const UserSpousePhone = localStorage.getItem("UserSpousePhone");
      let UserMinistries = [];
      let UserCellGroups = [];
      try {
        let value = localStorage.getItem("UserMinistries");
        if (value != null) {
          // do something
          const AsyncUserMinistries = localStorage.getItem(
            "UserMinistries"
          );
          UserMinistries = JSON.parse(AsyncUserMinistries);
        }
      } catch (error) {
        console.log(error);
      }
      try {
        let value = localStorage.getItem("UserCellGroups");
        if (value != null) {
          // do something
          const AsyncUserCellGroups = localStorage.getItem(
            "UserCellGroups"
          );
          UserCellGroups = JSON.parse(AsyncUserCellGroups);
        } else {
          UserCellGroups = [];
        }
      } catch (error) {
        console.log(error);
      }

      if (UserID) {
        setUserdata({
          Tkn,
          UserID,
          UserAlias,
          UserGender,
          UserEmail,
          UserPhone,
          UserAddress,
          UserZone,
          UserImg,
          UserNok,
          UserNokPhone,
          UserNokRel,
          UserMariral,
          UserSpouse,
          UserSpousePhone,
          UserMinistries,
          UserCellGroups,
        });
        console.log("Set done");
      }
    };
    asyncFetch();
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
    marginBottom: "60px",
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
    marginBottom: "115px"
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