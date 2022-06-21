import axios from 'axios';

export const apiUrl = 'http://localhost:5045';

export const reqInstance = () => axios.create({
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'accept': 'text/plain'
    }
})

const authService = {
    storedJwt: () => {
        return localStorage.getItem('token')
    },
    getRole: reqInstance().get(`${apiUrl}/user/getrole`)
        .then((response) => {
            return response.data
        }),
    // login: new Promise(resolve => (userName, password) => {
    //     let data = {
    //         userName,
    //         password
    //     }
    //     console.log(data)
    //     reqInstance().post(`${apiUrl}/user/login`, data)
    //         .then((response) => {
    //             // console.log(response.data);
    //             localStorage.setItem('token', response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             localStorage.setItem('token', "error");
    //         })
    // },
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
