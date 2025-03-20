import Footer from "./Footer";
import Sidebar from "./sidebar";
import Topnav from "./TopNav";

const SerPart = () => {
    return (
        <html lang="en">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
                    name="viewport"
                />
                <link
                    rel="icon"
                    href="../assets/img/kaiadmin/favicon.ico"
                    type="image/x-icon"
                />
                {/* <!-- Fonts and icons --> */}
                <script src="../assets/js/plugin/webfont/webfont.min.js"></script>
                {/* <!-- CSS Files --> */}
                <link rel="stylesheet" href="../assets/css/plugins.min.css" />
                <link rel="stylesheet" href="../assets/css/kaiadmin.min.css" />
            </head>
            <body>
                <div className="wrapper">
                    <Sidebar></Sidebar>
                    <div className="main-panel">
                        <Topnav></Topnav>

                        <div className="container">
                            <div className="page-inner">
                                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">

                                </div>
                            </div>
                        </div>

                        <footer className="footer">
                            <Footer></Footer>
                        </footer>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default SerPart;
