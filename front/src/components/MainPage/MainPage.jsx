import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../Home";
import Cart from '../../pages/Cart'
import Menu from "../Menu/Menu";
import './MainPage.scss';
import AboutUsComp from "../AboutUs/AboutUsComp";
import Address from "../../pages/Address/Address";
import {Admin} from "../../pages/Admin/Admin";
import Login from "../Authorization/Login";

function MainPage() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        }
        else if (scrolled <= 300){
            setVisible(false)
        }
    };

    window.addEventListener('scroll', toggleVisible);

    const rollBack = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }
    return <div className="MainPage">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/aboutus" element={<AboutUsComp/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/address" element={<Address/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={<Admin/>}/>
        </Routes>
        <button className="Return" onClick={rollBack} style={{display: visible ? 'inline' : 'none'}}>&#8593;</button>
    </div>

}

export default MainPage
