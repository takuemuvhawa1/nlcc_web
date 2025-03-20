import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import Swal from "sweetalert2";
import { BarLoader, ClipLoader } from "react-spinners";

const EmailRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (isSelected == false) {
      Swal.fire({
        text: "Registration failed, Please confirm that you have read privacy policy",
        icon: "error",
      });
      return;
    }
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    // const userObj = {
    //     registerwith: "Email",
    //     name: inputs.name,
    //     surname: inputs.surname,
    //     phone: inputs.phone == "" ? null : inputs.phone,
    //     email: inputs.email,
    //     gender: inputs.gender == "Male" ? "M" : "F",
    //     address: null,
    //     country: inputs.country,
    //   };
    const userObj = {
      registerwith: "Email",
      name,
      surname,
      gender: gender == "Male" ? "M" : "F",
      address: null,
      email,
      phone: phone == "" ? null : phone,
      country,
    };

    try {
      // const response = await fetch(`${API_URL}/onboarding`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(credObj)
      // });

      let signinresponse = await fetch(`${API_URL}/onboarding/member`, {
        method: "post",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let resJson = await signinresponse.json();
      console.log(resJson);

      if (resJson.message == "Member added successfully") {
        setIsLoading(false);
        localStorage.setItem("Typed", email);
        localStorage.setItem("TypedWith", "Email");
        localStorage.setItem("ReceivedOTP", resJson.randNum);
        localStorage.setItem("ReceivedName", name + " " + surname);
        setName("");
        setSurname("");
        setGender("");
        setEmail("");
        setPhone("");
        setCountry("");
        navigate("/setpassword");
        return;
      }
      if (resJson.message == "User already registered") {
        setIsLoading(false);
        Swal.fire({
          text: "Registration failed, you are registered already!",
          icon: "error",
        });
        return;
      }
    } catch (err) {
      Swal.fire({
        text: "Registration failed, check your network connection!",
        icon: "error",
      });
      setIsLoading(false);
    }
  };

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
                            Email Registration
                          </h1>
                          <p
                            className="text-gray-100 mb-4"
                            style={{ margin: 0 }}
                          >
                            Lets get started, fill in your details and click register button
                          </p>
                        </div>
                      </div>

                      <form className="user" onSubmit={handleRegister}>
                        <div className="row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control form-control-user custom-input"
                                id="name"
                                placeholder="First Name(s)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ height: "50px" }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control form-control-user custom-input"
                                id="surname"
                                placeholder="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                                style={{ height: "50px" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <div className="form-group">
                              <select
                                className="form-control"
                                id="gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                                style={{ height: "50px" }}
                              >
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control form-control-user custom-input"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ height: "50px" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control form-control-user custom-input"
                                id="phone"
                                placeholder="Phone (Optional)"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={{ height: "50px" }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <div className="form-group">
                              <select
                                className="form-control"
                                id="country"
                                name="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                style={{ height: "50px" }}
                              >
                                <option value="">Select Country</option>
                                <option value="AF">Afghanistan</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AG">Antigua and Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BT">Bhutan</option>
                                <option value="BO">Bolivia</option>
                                <option value="BA">
                                  Bosnia and Herzegovina
                                </option>
                                <option value="BW">Botswana</option>
                                <option value="BR">Brazil</option>
                                <option value="BN">Brunei Darussalam</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="CV">Cabo Verde</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="CF">
                                  Central African Republic
                                </option>
                                <option value="TD">Chad</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CO">Colombia</option>
                                <option value="KM">Comoros</option>
                                <option value="CD">
                                  Congo (Democratic Republic)
                                </option>
                                <option value="CG">Congo</option>
                                <option value="CR">Costa Rica</option>
                                <option value="CI">Côte d'Ivoire</option>
                                <option value="HR">Croatia</option>
                                <option value="CU">Cuba</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czechia</option>
                                <option value="DK">Denmark</option>
                                <option value="DJ">Djibouti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Equatorial Guinea</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="SZ">Eswatini</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GH">Ghana</option>
                                <option value="GR">Greece</option>
                                <option value="GD">Grenada</option>
                                <option value="GT">Guatemala</option>
                                <option value="GN">Guinea</option>
                                <option value="GW">Guinea-Bissau</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haiti</option>
                                <option value="HN">Honduras</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IR">Iran</option>
                                <option value="IQ">Iraq</option>
                                <option value="IE">Ireland</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italy</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KI">Kiribati</option>
                                <option value="KP">North Korea</option>
                                <option value="KR">South Korea</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LA">Laos</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LS">Lesotho</option>
                                <option value="LR">Liberia</option>
                                <option value="LY">Libya</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malawi</option>
                                <option value="MY">Malaysia</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Marshall Islands</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauritius</option>
                                <option value="MX">Mexico</option>
                                <option value="FM">Micronesia</option>
                                <option value="MD">Moldova</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="ME">Montenegro</option>
                                <option value="MA">Morocco</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Netherlands</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Niger</option>
                                <option value="NG">Nigeria</option>
                                <option value="MK">North Macedonia</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PW">Palau</option>
                                <option value="PS">Palestine</option>
                                <option value="PA">Panama</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="QA">Qatar</option>
                                <option value="RO">Romania</option>
                                <option value="RU">Russia</option>
                                <option value="RW">Rwanda</option>
                                <option value="KN">
                                  Saint Kitts and Nevis
                                </option>
                                <option value="LC">Saint Lucia</option>
                                <option value="VC">
                                  Saint Vincent and the Grenadines
                                </option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">
                                  Sao Tome and Principe
                                </option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Serbia</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leone</option>
                                <option value="SG">Singapore</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="SB">Solomon Islands</option>
                                <option value="SO">Somalia</option>
                                <option value="ZA">South Africa</option>
                                <option value="SS">South Sudan</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SD">Sudan</option>
                                <option value="SR">Suriname</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="SY">Syria</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TZ">Tanzania</option>
                                <option value="TH">Thailand</option>
                                <option value="TL">Timor-Leste</option>
                                <option value="TG">Togo</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad and Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TM">Turkmenistan</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VA">Vatican City</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Vietnam</option>
                                <option value="YE">Yemen</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div style={{ flexDirection: "row" }}>
                          <a
                            className="small"
                            style={{ color: "black", marginBottom: "17px" }}
                            href="https://gasglide.com/policies/Privacy%20Policy%20for%20NLCC.pdf"
                            target="_blank"
                          >
                            Privacy policy
                          </a>
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => setIsSelected(!isSelected)}
                            />
                            I confirm i have read the privacy policy
                          </label>
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
                          Register
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

export default EmailRegister;
