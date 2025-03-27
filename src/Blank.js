import React, { useEffect, useState } from "react";
import About from "./About";
import Calender from "./Calender";
import Cellgroups from "./Cellgroups";
import Ministries from "./Ministries";
import PrayerReq from "./PrayerReq";
import Notifications from "./Notifications";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Blank = () => {
  const [activeComponent, setActiveComponent] = useState("Refresh");
  const [searchQuery, setSearchQuery] = useState("");

  const dat = [
    {
      id: 1,
      img: "swipe1.jpeg",
    },
    {
      id: 2,
      img: "swipe2.jpeg",
    },
    {
      id: 3,
      img: "swipe3.jpeg",
    },
    {
      id: 4,
      img: "swipe4.jpeg",
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    localStorage.removeItem("selectedMinistry");
  }, []);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const getButtonStyle = (component) => {
    return {
      marginBottom: "10px",
      marginRight: "10px",
      width: "200px",
      height: "45px",
      border: "1px solid #000000",
      borderRadius: "10px",
      borderWidth: "0px",
      backgroundColor: activeComponent === component ? "#1a6363" : "#B5D3CF",
      color: activeComponent === component ? "#ffffff" : "#000000",
    };
  };

  return (
    <>
      <html lang="en">
        <body>
          {/* <!-- Begin page content --> */}
          <div className="container-fluid">
            {/* <!-- Home page --> */}
            <div id="page-home" className="active mt-4">
              <div className="col-lg-6">
                <form className="nosubmit">
                  <input
                    className="nosubmit form-control"
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
              <div className="block mt-4">
                <center>
                  <div
                    className="outer"
                    style={{
                      justifyContent: "space-between",
                      paddingInline: "8px",
                    }}
                  >
                    <button
                      style={getButtonStyle("About")}
                      onClick={() => handleButtonClick("About")}
                    >
                      About
                    </button>
                    <button
                      style={getButtonStyle("Ministries")}
                      onClick={() => handleButtonClick("Ministries")}
                    >
                      Ministries
                    </button>
                    <button
                      style={getButtonStyle("Calender")}
                      onClick={() => handleButtonClick("Calender")}
                    >
                      Calender
                    </button>
                    <button
                      style={getButtonStyle("Cellgroups")}
                      onClick={() => handleButtonClick("Cellgroups")}
                    >
                      Cell Groups
                    </button>
                    <button
                      style={getButtonStyle("PrayerReq")}
                      onClick={() => handleButtonClick("PrayerReq")}
                    >
                      Prayer Requests
                    </button>
                    <button
                      style={getButtonStyle("Refresh")}
                      onClick={() => handleButtonClick("Refresh")}
                    >
                      Refresh
                    </button>
                  </div>
                </center>
              </div>
            </div>

            <div
              id="page-account"
              className="active"
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                paddingHorizontal: "20px",
              }}
            >
              {activeComponent === "About" && (
                <div style={{ width: "100%", alignSelf: "center" }}>
                  <About />
                </div>
              )}
              {activeComponent === "Ministries" && (
                <div style={{ width: "100%", alignSelf: "center" }}>
                  <Ministries searchQuery={searchQuery} />
                </div>
              )}
              {activeComponent === "Calender" && (
                <div style={{ width: "100%" }}>
                  <Calender searchQuery={searchQuery} />
                </div>
              )}
              {activeComponent === "Cellgroups" && (
                <div style={{ width: "100%" }}>
                  <Cellgroups searchQuery={searchQuery} />
                </div>
              )}
              {activeComponent === "PrayerReq" && (
                <div style={{ width: "100%" }}>
                  <PrayerReq searchQuery={searchQuery} />
                </div>
              )}
              {activeComponent === "Refresh" && (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: "240px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CarouselProvider
                      naturalSlideWidth={100}
                      naturalSlideHeight={125}
                      totalSlides={4}
                      isPlaying={true}
                    >
                      <Slider>
                        <Slide index={0}>
                          <img
                            src={"../couresol/swipe1.jpeg"}
                            style={{
                              width: "99%",
                              height: "220px",
                              backgroundColor: "pink",
                              borderRadius: "10px",
                              marginTop: "10px",
                            }}
                          />
                        </Slide>
                        <Slide index={1}>
                          <img
                            src={"../couresol/swipe2.jpeg"}
                            style={{
                                width: "97%",
                              height: "220px",
                              backgroundColor: "pink",
                              borderRadius: "10px",
                              margin: "10px",
                            }}
                          />
                        </Slide>
                        <Slide index={2}>
                          <img
                            src={"../couresol/swipe3.jpeg"}
                            style={{
                                width: "97%",
                              height: "220px",
                              backgroundColor: "pink",
                              borderRadius: "10px",
                              margin: "10px",
                            }}
                          />
                        </Slide>
                        <Slide index={3}>
                          <img
                            src={"../couresol/swipe4.jpeg"}
                            style={{
                                width: "97%",
                              height: "220px",
                              backgroundColor: "pink",
                              borderRadius: "10px",
                              margin: "10px",
                            }}
                          />
                        </Slide>
                      </Slider>
                    </CarouselProvider>
                  </div>
                  <div style={{ width: "100%" }}>
                    <Notifications searchQuery={searchQuery} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </body>
      </html>
    </>
  );
};

export default Blank;
