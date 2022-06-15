import React from 'react';
import AboutUs from '../../container/AboutUs/AboutUs'


function AboutUsComp() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div>
        <AboutUs/>
    </div>
}

export default AboutUsComp
