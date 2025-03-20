import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "./config";
import Swal from "sweetalert2";
import { BarLoader, ClipLoader } from "react-spinners";

const Registerwith = () => {
    const navigate = useNavigate();

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
                                                    <h1 className="h5 text-gray-900 mb-4" style={{ margin: 0 }}>Create an Account</h1>
                                                </div>
                                            </div>

                                            <div className="user" >
                                               
                                                <button
                                                    className="btn btn-dark btn-user btn-block"
                                                    onClick={()=>navigate("/registeremail")}
                                                    type="button"
                                                    style={{ backgroundColor: 'rgba(17, 112, 63, 0.866)', borderColor: 'rgba(19, 171, 92, 0.866)', width: '100%', height: '50px' }}
                                                    >
                                                    Register With Email
                                                </button>
                                                <button
                                                    className="btn btn-dark btn-user btn-block"
                                                    type="button"
                                                    onClick={()=>navigate("/registerphone")}
                                                    style={{ backgroundColor: 'rgba(17, 112, 63, 0.866)', borderColor: 'rgba(19, 171, 92, 0.866)', width: '100%', height: '50px', marginTop: '30px' }}
                                                >
                                                    Register With Mobile Number
                                                </button>
                                                <div className="">
                                                    <p></p>
                                                    <a className="small" style={{ color: 'black' }} href="/">Already registered? Login!</a>
                                                   
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registerwith;
