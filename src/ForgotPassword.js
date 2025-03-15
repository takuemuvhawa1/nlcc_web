import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "./config";
import Swal from "sweetalert2";
import { BarLoader } from "react-spinners";

const ForgotPassword = () => {
    const navigate = useNavigate();
   
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        if (isLoading){
            return;
        }
        setIsLoading(true);

        try {
    
            let signinresponse = await fetch(`${API_URL}/onboarding/forgotpassword`, {
                method: "post",
                body: JSON.stringify({email}),
                headers: {
                  "Content-Type": "application/json",
                },
              });
          
              let resJson = await signinresponse.json();
              console.log(resJson);

              setIsLoading(false);
                if (resJson.message == "Email found") {
                    setEmail("");
                    localStorage.setItem("ForgotEmail", email);
                    localStorage.setItem("ForgotOTP", resJson.randNum.toString());
                    localStorage.setItem("ForgotName", resJson.member.Name +" "+resJson.member.Surname);
                    navigate('/resetpassword');
                    return;
                }else{
                    Swal.fire({
                        text: "Proceeding failed,  email not found!",
                        icon: "error"
                    });
                }
        } catch (err) {
            Swal.fire({
                text: "Registration failed, check your network connection!",
                icon: "error"
            });
            setIsLoading(false);
        }
    };


    return (
        <div style={{ backgroundColor: 'rgb(246, 243, 237)', height: '100vh', overflow: 'hidden' }}>
            <div className="container">
                <div className="row justify-content-center" style={{ alignItems: 'center', minHeight: '100vh' }}>
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0" style={{ overflowY: 'scroll', maxHeight: '90vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
                                            <div className="row text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0 }}>
                                                <div className="col-lg-8">
                                                    <img src="../nlcc-logo.png" height="50px" width="120px" alt="NLCC Logo" />
                                                    <h1 className="h5 text-gray-900 mb-4" style={{ margin: 0 }}>Forgot Password</h1>
                                                    <p className="text-gray-100 mb-4" style={{ margin: 0 }}>Provide email or phone to proceed and receive password reset instructions</p>
                                                </div>
                                            </div>

                                            <form className="user" onSubmit={handleRegister}>
                                                
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-user custom-input"
                                                        id="email"
                                                        placeholder="Email or phone"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        style={{height: '50px'}}
                                                    />
                                                </div>
                                              
                                                <button
                                                    className="btn btn-dark btn-user btn-block"
                                                    type="submit"
                                                    style={{ backgroundColor: 'rgba(17, 112, 63, 0.866)', borderColor: 'rgba(19, 171, 92, 0.866)', width: '100%', height: '50px' }}
                                                >
                                                    Proceed
                                                </button>
                                                <div className="text-center">
                                                    <p></p>
                                                    <a className="small" style={{ color: 'black' }} href="/">Remember password? Login!</a>
                                                </div>
                                            </form>
                                            <hr />
                                        </div>
                                    </div>
                                    {isLoading && (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-58px' }}>
                                            <BarLoader size={40} width={'100%'} color="blue" loading />
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

export default ForgotPassword;
