import React from 'react';

import {SubHeading} from '../../components';
import {images} from '../../constants';

const FindUs = () => (
    <div className="app__bg app__wrapper section__padding" id="contact">
        <div className="app__wrapper_info">
            <SubHeading title="Контакты"/>
            <h1 className="headtext__cormorant" style={{marginBottom: '3rem'}}>Контакты</h1>
            <div className="app__wrapper-content">
                <p className="p__opensans">ул. Демьяна Бедного, 100, Тюмень</p>
                <p className="p__cormorant" style={{color: '#DCCA87', margin: '2rem 0'}}>Часы работы</p>
                <p className="p__opensans">Пн-Пт: 09:00 - 17:30</p>
            </div>
            <a href='https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%94%D0%B5%D0%BC%D1%8C%D1%8F%D0%BD%D0%B0+%D0%91%D0%B5%D0%B4%D0%BD%D0%BE%D0%B3%D0%BE,+100,+%D0%A2%D1%8E%D0%BC%D0%B5%D0%BD%D1%8C,+%D0%A2%D1%8E%D0%BC%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB.,+625007/data=!4m2!3m1!1s0x43bbe10fc7f4e4b9:0x6d2ab0f9c1f67f71?sa=X&ved=2ahUKEwjzp5XP5Zb4AhWKl4sKHQMtDP4Q8gF6BAgCEAE'>
                <button type="button" className="custom__button" style={{marginTop: '2rem'}}>
                Посетить
            </button>
            </a>
        </div>

        <div className="app__wrapper_img">
            <img src={images.findus} alt="finus_img"/>
        </div>
    </div>
);

export default FindUs;
