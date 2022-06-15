import React, {useState} from 'react';
import Modal from 'react-modal'
import './Login.css'
import authService from "../../services/authService";


export default function Login(props) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setauthToken] = useState(authService.storedJwt);

    const handleSubmit = async e => {
        e.preventDefault();
        authService.login(
            userName,
            password
        );
        setauthToken(authService.storedJwt)
        console.log(props)
        if (authToken.length > 30)
            props.authSet(true);
    }

    return <div className="z10">
        {/*<Modal style={{*/}
        {/*    content: {*/}
        {/*        maxWidth: '50%',*/}
        {/*        minWidth: '240px',*/}
        {/*        margin: 'auto',*/}
        {/*        height: 'fit-content',*/}
        {/*        background: '#f1f1f1'*/}
        {/*    }*/}
        {/*}}*/}
        {/*       {...props}>*/}
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <label htmlFor="uname"><b>Логин</b></label>
                    <input type="text" placeholder="Введите логин пользователя" name="uname" required
                           onChange={(e) => setUserName(e.target.value)}/>
                    <label htmlFor="psw"><b>Пароль</b></label>
                    <input type="password" placeholder="Введите пароль" name="psw" required
                           onChange={(e) => setPassword(e.target.value)}/>

                    <button className="login" type="submit">Войти</button>
                    <label style={authToken == "error" ? {display:"none"} : {display:"flex"}}>
                        Error
                    </label>
                </div>
            </form>
        {/*</Modal>*/}
    </div>
}
