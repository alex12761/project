import React, {useState} from 'react';
import axios from 'axios';

export const apiUrl = 'https://localhost:44315';

export const reqInstance = axios.create({
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("access_token"),
        'Content-Type': 'application/json',
        'accept': 'text/plain'
    }
})

const authService = {
    storedJwt: localStorage.getItem('token'),
    login: (userName, password) => {
        let data = {
            userName,
            password
        }
        console.log(data)
        const resp = reqInstance.post(`${apiUrl}/user/login`, data
        ).then((response) => {
            // console.log(response.data);
            localStorage.setItem('token', response.data);
        }).catch((error) => {
            console.log(error)
            localStorage.setItem('token', "error");
        })
    },
    getToken: () => {
        console.log(localStorage.getItem('token'))
    },
    logout() {
        localStorage.removeItem("token");
    },
    register(username, email, password, givenName) {
        let id = 0;
        let role = "user";
        return axios.post(apiUrl + "/user/register", {
            id,
            username,
            password,
            email,
            givenName,
            role
        });
    }
}
export default authService;
