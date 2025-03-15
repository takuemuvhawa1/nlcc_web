import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Blank from './Blank';
import Register from './Register';
import Topnav from './TopNav';
import Footer from './Footer';
import Ministry from './Ministry';
import Cellgroup from './Cellgroup';
import Event from './Event';
import Sermons from './Sermons';
import Contributions from './Contributions';
import More from './More';
import MyProfile from './MyProfile';
import Settings from './Settings';
import Kids from './Kids';
import Registerwith from './Registerwith';
import ForgotPassword from './ForgotPassword';
import EmailRegister from './EmailRegister';
import PhoneRegister from './PhoneRegister';
import ResetPassword from './ResetPassword';

function App() {

    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/registerselect' element={<Registerwith />}></Route>
                    <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
                    <Route path='/resetpassword' element={<ResetPassword />}></Route>
                    <Route path='/registeremail' element={<EmailRegister />}></Route>
                    <Route path='/registerphone' element={<PhoneRegister />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/home' element={
                        <>
                            <Topnav />
                            <Blank />
                            <Footer />
                        </>
                    }></Route>
                    <Route path='/ministry' element={
                        <>
                            <Topnav />
                            <Ministry />
                            <Footer />
                        </>
                    }></Route>
                    <Route path='/cellgroup' element={
                        <>
                            <Topnav />
                            <Cellgroup />
                            <Footer />
                        </>
                    }></Route>
                    <Route path='/event' element={
                        <>
                            <Topnav />
                            <Event />
                            <Footer />
                        </>
                    }></Route>
                    <Route path='/sermons' element={
                        <>
                            <Topnav />
                            <Sermons />
                            <Footer />
                        </>
                    }></Route>
                    <Route path='/contributions' element={
                        <>
                            <Topnav />
                            <Contributions />
                            <Footer />
                        </>
                    }></Route>
                    <Route path='/more' element={
                        <>
                            <Topnav />
                            <More />
                            <Footer />
                        </>
                    }></Route>
                    <Route path='/myprofile' element={
                        <>
                            <Topnav />
                            <MyProfile />
                            <Footer />
                        </>
                    }></Route>
                    <Route path='/settings' element={
                        <>
                            <Topnav />
                            <Settings />
                            <Footer />
                        </>
                    }></Route>
                    <Route path='/kids' element={
                        <>
                            <Topnav />
                            <Kids />
                            <Footer />
                        </>
                    }></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;