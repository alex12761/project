import React from 'react';
import {Route, Routes} from "react-router-dom";

import {Footer} from './container/index';
import {Navbar} from './components';
import './App.css';

import MainPage from "./components/MainPage/MainPage";
import Login from "./components/Authorization/Login";
import {Admin} from "./pages/Admin/Admin";

const App = () => (
    <div className="appPageMain">
        {/*<Routes>*/}
        {/*    <Route path="/login" element={<Login/>}/>*/}
        {/*    <Route path="/admin" element={<Admin/>}/>*/}
        {/*</Routes>*/}
        <Navbar/>
        <MainPage/>
        <Footer/>
    </div>
)
;

export default App;
