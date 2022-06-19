import React, {useEffect, useState} from 'react';
import Modal from 'react-modal'
import './Login.css'
import authService, {apiUrl, reqInstance} from "../../services/authService";
import {frontip} from "../../pages/Admin/Admin";


export default function Login(props) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        reqInstance().post(`${apiUrl}/user/login`, {userName, password})
            .then((response) => {
                if (response.status != 200) {
                    alert("Логин или пароль введены неверно!")
                    return
                }
                localStorage.setItem('token', response.data);

                if (authService.storedJwt().length > 30) {
                    reqInstance().get(`${apiUrl}/user/getrole`)
                        .then((response) => {
                            if (response.data == "admin")
                                window.location.replace(frontip.concat("/admin"))
                            else
                                window.location.replace(frontip.concat("/menu"));
                        })
                        .catch((error) => {
                            console.log(error)
                            window.location.replace(frontip.concat("/menu"));
                        })
                }
            })
            .catch((error) => {
                console.log(error)
                localStorage.setItem('token', "error");
            })
    }

    const [role, setRole] = useState("");
    useEffect(() => {
        reqInstance().get(`${apiUrl}/user/getrole`)
            .then((response) => {
                console.log(response.data);
                setRole(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [role])

    if (role)
        return <button onClick={e => {
            localStorage.setItem("token", "");
            setRole("")
        }}>Выйти</button>

    return <div className="z10 loginForm">
        <form onSubmit={handleSubmit}>
            <div className="container">
                <label htmlFor="uname"><b>Логин</b></label>
                <input type="text" placeholder="Введите логин пользователя" name="uname" required
                       onChange={(e) => setUserName(e.target.value)}/>
                <label htmlFor="psw"><b>Пароль</b></label>
                <input type="password" placeholder="Введите пароль" name="psw" required
                       onChange={(e) => setPassword(e.target.value)}/>

                <button className="login" type="submit">Войти</button>
            </div>
        </form>
    </div>
}
