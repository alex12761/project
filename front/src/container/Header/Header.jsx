import React from 'react';
// import bg from '../../assets/bg.png'

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';
import {Link} from "react-router-dom";

const Header = () => (
  <div className="app__header app__wrapper app__bg section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Узнай новые грани вкуса" />
      <h1 className="app__header-h1">Жаренная форель</h1>
      <p className="p__opensans" style={{ margin: '2rem 0' }}>Закажите сейчас и мы вам пожелаем приятного аппетита</p>
        <button type="button" className="custom__button"><Link to="/menu">Посмотреть меню</Link></button>
    </div>

    <div className="app__wrapper_img">
      <img src={images.welcome} alt="header_img" />
    </div>
  </div>
);

export default Header;
