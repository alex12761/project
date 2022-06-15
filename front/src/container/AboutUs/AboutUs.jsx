import React from 'react';

import {images} from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
    <div className="app__aboutus app__bg flex__center section__padding" id="about">
        <div className="app__aboutus-overlay flex__center">
            <img src={images.G} alt="G_overlay"/>
        </div>

        <div className="app__aboutus-content flex__center">
            <div className="app__aboutus-content_about">
                <h1 className="headtext__cormorant">О нас</h1>
                <img src={images.spoon} alt="about_spoon" className="spoon__img"/>
                <p className="p__opensans">Столовая № 100 предлагает своим посетителям окунуться в атмосферу вкусной еды
                    и прохладных напитков. Если запах свежеиспеченного теста пробуждает в вас сильный голод, то это
                    заведение сможет доставить вам радость. Помимо умопомрачительных ароматов вас ждет горячий кофе,
                    чай, а также прохладительные напитки.</p>
                {/*<button type="button" className="custom__button">Узнать больше</button>*/}
            </div>

            <div className="app__aboutus-content_knife flex__center">
                <img src={images.knife} alt="about_knife"/>
            </div>

            <div className="app__aboutus-content_history">
                <h1 className="headtext__cormorant">Бронирование</h1>
                <img src={images.spoon} alt="about_spoon" className="spoon__img"/>
                <br/>
                <p className="p__opensans">В Столовой № 100 можно заказать банкет для проведения торжественных
                    мероприятий. Свадьбы, дни рождения и другие праздники — для этого нужно много пространства. Точное
                    число посадочных мест следует уточнить заранее.</p>
                <br/>
                {/*<a href="https://web.whatsapp.com/send?phone=+79505073729">*/}
                {/*    <button type="button" className="custom__button">Узнать больше</button>*/}
                {/*</a>*/}
            </div>
        </div>
    </div>
);

export default AboutUs;
