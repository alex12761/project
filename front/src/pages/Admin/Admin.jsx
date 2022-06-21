import React, {useEffect, useState} from 'react';
import {apiUrl, reqInstance} from "../../services/authService";
import DishItem from "../../components/AdminComponents/DishItem";

export const frontip = "http://localhost:3000";

export const Admin = () => {
    // console.log("i, here")
    const [dishes, setDishes] = useState([]);
    const [isChange, setIsChange] = useState(false);
    useEffect(() => {
        reqInstance().get(`${apiUrl}/dish/get?category=all`)
            .then((response) => {
                setDishes(response.data)
                console.log(response.data)
            })
    }, [isChange])

    useEffect(() => {
        console.log("request to role")
        reqInstance().get(`${apiUrl}/user/getrole`)
            .then((response) => {
                console.log(response.data);
                if (response.data !== "admin")
                    window.location.replace(frontip.concat("/login"))
            })
            .catch((error) => {
                console.log(error)
                window.location.replace(frontip.concat("/login"))
            })
    }, [])

    // const [isEdit, setIsEdit] = useState(false)
    const [_title, set_title] = useState("")
    const [_price, set_price] = useState(100)
    const [_category, set_category] = useState("4")
    const [_image, set_image] = useState("")

    const handleLoadFile =(e)=>{
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            set_image(reader.result.substring(22))
        };
        reader.readAsDataURL(file);
    }

    const handleSave = ()=> {
        console.log(_title)
        console.log(_price)
        console.log(_category)
        console.log(_image)
        if (!_title){
            alert("Заполните поле наименование")
            return
        }

        if (!_price){
            alert("Заполните поле цена")
            return
        }

        if (!_category){
            alert("Заполните поле категория")
            return
        }

        if (!_image){
            alert("Заполните поле изображение")
            return
        }


        let data = {
            id: 0,
            title: _title,
            description: "new admin dish ".concat(new Date().toLocaleString()),
            rating: 5,
            category: _category,
            image: _image,
            price: _price
        }
        reqInstance().post(`${apiUrl}/dish`, data).then((response)=>{
            setIsChange(!isChange)
        })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="wrapper">
            <div className="container">
                <React.Fragment>
                    <table>
                        <thead>
                        <tr style={{"border-top": "none"}}>
                            <td>Наименование</td>
                            <td>Стоимость</td>
                            <td>Категория</td>
                            <td>Изображение</td>
                        </tr>
                        </thead>
                        {dishes.map((dish) =>
                            (<DishItem
                                key={dish.id}
                                {...dish}
                                onChange={setIsChange}
                            />))}
                        <tr className="adminRow">
                            <td className="adminString"><input type="text" value={_title} onChange={e => set_title(e.target.value)}/></td>
                            <td className="adminNumber"><input type="number" value={_price} onChange={e => set_price(e.target.value)}/></td>
                            <td className="adminString"> <input type="text" value={_category} onChange={e => set_category(e.target.value)}/></td>
                            <td className="adminImage"> <input type="file" accept=".png" onChange={e => handleLoadFile(e)} multiple={false}/></td>
                            <td colspan="2"> <button onClick={handleSave} value="Сохранить" className="addButton"/></td>
                        </tr>
                    </table>
                </React.Fragment>
            </div>
        </div>
    )
}
