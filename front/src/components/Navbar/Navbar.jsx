import React, {useEffect, useState} from 'react';
import images from '../../constants/images';
import './Navbar.css';
import Login from "../Authorization/Login";
import {Link} from "react-router-dom";
import Button from '../Button/index';
import {useSelector} from "react-redux";
import {apiUrl, reqInstance} from "../../services/authService";
import {frontip} from "../../pages/Admin/Admin";

const Navbar = () => {
    const [showAuth, setShowAuth] = useState(false);
    // let showModal = () => {
    //     setShowAuth(!showAuth)
    // };
    let posTop = window.pageYOffset;
    let authToken = localStorage.getItem('token')
    const [auth, setauth] = useState(false)
    useEffect(()=>{
        authToken = localStorage.getItem('token')
    }, [])
    const [cartTotalPrice, cartItemsCount] = useSelector(state => [
        state.cart.totalPrice,
        state.cart.count,
    ]);


    const [role, setRole] = useState("");
    useEffect(() => {
        reqInstance().get(`${apiUrl}/user/getrole`)
            .then((response) => {
                setRole(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <nav className="app__navbar" style={showAuth ? {zIndex:-1}: posTop > 200 ? {position: 'fixed', zIndex:5} : null}>
            <div className="app__navbar-logo">
                <Link to='/'><img src={images.gericht} alt="app__logo"/></Link>
            </div>
            <ul className="app__navbar-links">
                <li className="p__opensans"><Link to='/'>Главная</Link></li>
                <li className="p__opensans"><Link to="/aboutus">О нас</Link></li>
                <li className="p__opensans"><Link to='/menu'>Меню</Link></li>
                {role === "admin"? <li className="p__opensans"><Link to='/admin'>Админ панель</Link></li>:null}
            </ul>
            <div className="app__navbar-login">
                {!role?<dd/>
                    // <Link style={{color: "#fff"}} to="/login">Войти</Link>
                :<a className="p__opensans" onClick={e => {
                        localStorage.setItem("token", "");
                        setRole("")
                        if (window.location.href == frontip.concat("/admin"))
                            window.location.replace(frontip.concat("/login"))
                        console.log()
                    }}>Выйти</a>}
            </div>
            {/*<Login isOpen={showAuth} onRequestClose={() => setShowAuth(false)} authState={auth} authSet={setauth}/>*/}


            <Link to="/cart">
                <Button className="button--cart">
                    <span>{cartTotalPrice} ₽</span>
                    <div className="button__delimiter"></div>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"></path>
                        <path
                            d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"></path>
                        <path
                            d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"></path>
                    </svg>
                    <span>{cartItemsCount}</span>
                </Button>
            </Link>
        </nav>
    );
};

export default Navbar;
