import React, {useState} from 'react';
import {AboutUs, FindUs, Gallery, Header, Intro, SpecialMenu} from "../container";


function Home() {
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

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const rollBack = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }
    return <div>
        <Header />
        <AboutUs />
        <SpecialMenu />
        <Intro />
        <Gallery />
        <FindUs />
        <button className="Return" onClick={rollBack} style={{display: visible ? 'inline' : 'none'}}>&#8593;</button>
    </div>

}

export default Home
