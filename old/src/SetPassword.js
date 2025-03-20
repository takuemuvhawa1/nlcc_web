import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import Swal from "sweetalert2";
import { BarLoader, ClipLoader } from "react-spinners";

const SetPassword = () => {
  const navigate = useNavigate();
  const [nam, setNam] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpassword, setCnpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (isLoading){
        return;
    }
    if (password !== cnpassword) {
      Swal.fire({
        text: "Saving failed, password is not correctly confirmed!",
        icon: "error",
      });
      return;
    }

    const receivedOTP = localStorage.getItem("ReceivedOTP");
    if (otp != receivedOTP) {
      Swal.fire({
        text: "Saving failed, provided OTP is wrong!",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);

    const asyncTyped = localStorage.getItem("Typed");
    const asyncWith = localStorage.getItem("TypedWith");

    try {
      let signinresponse = await fetch(`${API_URL}/onboarding/setpassword`, {
        method: "post",
        body: JSON.stringify({
          registerwith: asyncWith,
          phonemail: asyncTyped,
          otp: otp,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let resJson = await signinresponse.json();
      console.log(resJson);

      if (resJson.message == "Password set successfully") {
        Swal.fire({
          text: "Saving successfull",
          icon: "success",
        });
        setOtp("");
        setPassword("");
        setCnpassword("");

        setIsLoading(false);
        navigate("/");
        return;
      }
    } catch (err) {
      Swal.fire({
        text: "Saving failed, check your network connection!",
        icon: "error",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const asyncNam = localStorage.getItem("ReceivedName");
      setNam(asyncNam);
    };
    fetchUserData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgb(246, 243, 237)",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          className="row justify-content-center"
          style={{ alignItems: "center", minHeight: "100vh" }}
        >
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div
                className="card-body p-0"
                style={{
                  overflowY: "scroll",
                  maxHeight: "90vh",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {/* Hide scrollbar for Firefox and IE */}
                <style>
                  {`
                                        .card-body::-webkit-scrollbar {
                                            display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
                                        }
                                    `}
                </style>
                <div className="row">
                  {/* <div className="col-lg-5 d-none d-lg-block bg-login-image" style={{ top: '30px' }}>
                                        <img src="../nlcc-logo3.png" height="470px" width="455px" alt="Background" />
                                    </div> */}
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div
                        className="row text-center"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: 0,
                        }}
                      >
                        <div className="col-lg-8">
                          <img
                            src="../nlcc-logo.png"
                            height="50px"
                            width="120px"
                            alt="NLCC Logo"
                          />
                          <h1
                            className="h5 text-gray-900 mb-4"
                            style={{ margin: 0 }}
                          >
                            Welcome&nbsp;{nam}
                          </h1>
                          <p
                            className="text-gray-100 mb-4"
                            style={{ margin: 0 }}
                          >
                            Enter the <b>OTP</b> you received from email and set
                            your password
                          </p>
                        </div>
                      </div>

                      <form
                        className="user"
                        method="POST"
                        onSubmit={handleRegister}
                      >
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user custom-input"
                            id="name"
                            placeholder="OTP Received on email"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            style={{ height: "50px" }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user custom-input"
                            id="name"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ height: "50px" }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user custom-input"
                            id="name"
                            placeholder="Confirm password"
                            value={cnpassword}
                            onChange={(e) => setCnpassword(e.target.value)}
                            required
                            style={{ height: "50px" }}
                          />
                        </div>

                        <button
                          className="btn btn-dark btn-user btn-block"
                          type="submit"
                          style={{
                            backgroundColor: "rgba(17, 112, 63, 0.866)",
                            borderColor: "rgba(19, 171, 92, 0.866)",
                            width: "100%",
                            height: "50px",
                          }}
                        >
                          Save Password
                        </button>
                        <div className="text-center">
                          <p></p>
                          <a
                            className="small"
                            style={{ color: "black" }}
                            href="/"
                          >
                            Already registered? Login!
                          </a>
                        </div>
                      </form>
                      <hr />
                    </div>
                  </div>
                  {isLoading && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "-58px",
                      }}
                    >
                      <BarLoader
                        size={40}
                        width={"100%"}
                        color="blue"
                        loading
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
