import React from 'react';

import {Footer} from './container/index';
import {Navbar} from './components';
import './App.css';

import MainPage from "./components/MainPage/MainPage";

const App = () => (
    <div>
        <Navbar/>
        <MainPage/>
        <Footer/>
    </div>
)
;

export default App;
