import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "./config";
import Swal from "sweetalert2";
import { BarLoader } from "react-spinners";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        if (isLoading){
            return;
        }
        setIsLoading(true);

        try {
            const userdata = {
                email,
                password,
                pushtoken: null
            };
    
            const response = await fetch(`${API_URL}/onboarding/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userdata)
            });

            const data = await response.json();

            if (data.message == "Login successful") {
                
                setEmail("");
                setPassword("");
                setIsLoading(false);
                localStorage.setItem("Tkn", "No token");
                localStorage.setItem("ScrollerNum", "zero");
                localStorage.setItem(
                  "UserID",
                  data.member.MemberID.toString()
                );
                localStorage.setItem(
                  "UserAlias",
                  data.member.Name + " " + data.member.Surname
                );
                localStorage.setItem("UserGender", data.member.Gender);
                localStorage.setItem(
                  "UserEmail",
                  data.member.Email == null ? "---" : data.member.Email
                );
                localStorage.setItem(
                  "UserPhone",
                  data.member.Phone == null ? "---" : data.member.Phone
                );
                localStorage.setItem(
                  "UserAddress",
                  data.member.Address == null ? "---" : data.member.Address
                );
                localStorage.setItem(
                  "UserZone",
                  data.member.Zone == null ? "---" : data.member.Zone
                );
                localStorage.setItem(
                  "UserImg",
                  data.member.ProfilePicture == null
                    ? "https://srv702611.hstgr.cloud:3003/file/1738669600035.png"
                    : data.member.ProfilePicture
                );
                localStorage.setItem(
                  "UserPrefMail",
                  data.member.preferred_email == null
                    ? "0"
                    : data.member.preferred_email.toString()
                );
                localStorage.setItem(
                  "UserPrefPhone",
                  data.member.preferred_phone == null
                    ? "0"
                    : data.member.preferred_phone.toString()
                );
                localStorage.setItem(
                  "UserNok",
                  data.member.nxt_of_kin == null
                    ? "---"
                    : data.member.nxt_of_kin
                );
                localStorage.setItem(
                  "UserNokPhone",
                  data.member.nok_phone == null
                    ? "---"
                    : data.member.nok_phone
                );
                localStorage.setItem(
                  "UserNokRel",
                  data.member.nok_relationship == null
                    ? "---"
                    : data.member.nok_relationship
                );
                localStorage.setItem(
                  "UserMarital",
                  data.member.marital_status == null
                    ? "---"
                    : data.member.marital_status
                );
                localStorage.setItem(
                  "UserSpouse",
                  data.member.sponame == null ? "---" : data.member.sponame
                );
                localStorage.setItem(
                  "UserSpousePhone",
                  data.member.spophone == null ? "---" : data.member.spophone
                );
                if (data.member.ministries.length) {
                  localStorage.setItem(
                    "UserMinistries",
                    JSON.stringify(data.member.ministries)
                  );
                }
                if (data.member.cellgroups.length) {
                  localStorage.setItem(
                    "UserCellGroups",
                    JSON.stringify(data.member.cellgroups)
                  );
                }
                navigate('/home');
            } else if (data.message == "Invalid email or password") {
                Swal.fire({
                    text: "Incorrect Username or Password!",
                    icon: "error"
                });
                setIsLoading(false);
            } else {
                Swal.fire({
                    text: "Login failed, check your network connection!",
                    icon: "error"
                });
                setIsLoading(false);
            }
        } catch (err) {
            Swal.fire({
                text: "Login failed, check your network connection!",
                icon: "error"
            });
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'rgb(246, 243, 237)', height: '100vh', margin: 0 }}>
            <div className="container" style={{ height: '100%' }}>
                <div className="row justify-content-center" style={{ height: '100%', alignItems: 'center' }}>
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5" >
                            <div className="card-body p-0" style={{ height: '500px' }}>
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image">
                                        <img src="../nlcc-logo3.png" height="480px" width="500px" alt="Background" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="row text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0 }}>
                                                <div className="col-lg-8">
                                                    <div>
                                                        <img src="../nlcc-logo.png" height="50px" width="120px" alt="NLCC Logo" />
                                                    </div>
                                                    <h1 className="h4 text-gray-900 mb-4" style={{ margin: 0 }}>Sign In!</h1>
                                                </div>
                                            </div>

                                            <form className="user" onSubmit={handleLogin}>
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-user custom-input"
                                                        id="exampleInputEmail"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..."
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        style={{ height: '50px' }}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user custom-input"
                                                        id="exampleInputPassword"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                        style={{ height: "50px" }}
                                                    />
                                                </div>
                                                <br/>
                                                <button
                                                    className="btn btn-dark btn-user btn-block"
                                                    type="submit"
                                                    style={{ backgroundColor: 'rgba(17, 112, 63, 0.866)', borderColor: 'rgba(19, 171, 92, 0.866)', width: '100%', height: "50px" }}
                                                >
                                                    Login
                                                </button>
                                                <div><br></br>
                                                    <a className="small" style={{ color: 'black' }} href="/forgotpassword">Forgot password? Reset</a>
                                                </div>
                                                <div><br></br>
                                                    <a className="small" style={{ color: 'black' }} href="/registerselect">Not yet registered? Register</a>
                                                </div>
                                            </form>
                                            <hr />
                                        </div>
                                        <br /><br /><br /><br /><br />
                                    </div>
                                    {isLoading && (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-55px' }}>
                                            <BarLoader size={40} width={'100%'} color="green" loading />
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

export default Login;
