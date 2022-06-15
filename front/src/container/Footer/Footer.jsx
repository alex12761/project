import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram,  } from 'react-icons/fi';

// import { FooterOverlay, Newsletter } from '../../components';
import { images } from '../../constants';
import './Footer.css';

const Footer = () => (
  <div className="app__footer section__padding" id="login">
    {/*<FooterOverlay />*/}
    {/*<Newsletter />*/}

    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Контакты</h1>
        <p className="p__opensans">ул. Демьяна Бедного, 100, Тюмень</p>
        <p className="p__opensans">+7 950 507-37-29</p>
      </div>

      <div className="app__footer-links_logo">
        <img src={images.gericht} alt="footer_logo" />
        <p className="p__opensans">&quot;Лучший способ найти себя - это потерять себя в служении другим.&quot;</p>
        <p className="p__opensans">&copy;Махатма Ганди</p>
        <img src={images.spoon} className="spoon__img" style={{ marginTop: 15 }} />
        <div className="app__footer-links_icons">
          {/*<FiFacebook />*/}
          {/*<FiTwitter />*/}
          {/*<FiInstagram />*/}
        </div>
      </div>

      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Часы работы</h1>
        <p className="p__opensans">Пн-Пт:</p>
        <p className="p__opensans">09:00 - 17:30</p>
        {/*<p className="p__opensans">Saturday-Sunday:</p>*/}
        {/*<p className="p__opensans">07:00 am - 11:00 pm</p>*/}
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p__opensans">&copy; 2022. Все права защищены.</p>
    </div>

  </div>
);

export default Footer;
