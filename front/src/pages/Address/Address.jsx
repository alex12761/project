import React, {useState} from 'react';
import './Address.scss'
import {reqInstance} from "../../services/authService";
import {apiUrl} from "../../services/authService";
import {useSelector} from "react-redux";
import Home from "../../components/Home";
import {frontip} from "../Admin/Admin";

const Address = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [house, setHouse] = useState("");
    const [flat, setFlat] = useState("");
    let {items} = useSelector(state => state.cart);

    const placeOrder = () => {
        let userData = `Заказчик: ${name}||Телефон: ${phone}`;
        let addressData = `Улица: ${street}||Дом: ${house}||Квартира: ${flat}`;
        let cartItems ={};
        for (let key in items){
            cartItems[items[key][0].name] = items[key].length
        }
        let tempo = {userData: userData, address:addressData, dishes: cartItems};
        reqInstance().post(apiUrl.concat("/placeorder"), tempo)
        alert("Заказ оформлен, ожидайте звонка.")
        //По обстоятельствам работаем, просто переносим на другую главную страницу
        window.location = frontip.concat("/menu");
    }

    return (
        <div className="container">
            <div className="row">
                <label>Имя</label>
                <input type="text" onChange={e => setName(e.target.value)}/>
                <label>Номер телефона</label>
                <input type="number" onChange={e => setPhone(e.target.value)}/>
                <label>Улица</label>
                <input type="text" onChange={e => setStreet(e.target.value)}/>
                <label>Дом</label>
                <input type="text" onChange={e => setHouse(e.target.value)}/>
                <label>Квартира</label>
                <input type="text" onChange={e => setFlat(e.target.value)}/>
            </div>

            <div className="button pay-btn sml" onClick={placeOrder}>
                <span>Заказать</span>
            </div>
        </div>
    );
};

export default Address;
