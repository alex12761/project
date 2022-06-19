import React, {useState} from 'react';

import './DishItem.scss'
import {apiUrl, reqInstance} from "../../services/authService";

const DishItem = ({ id, title, price, category, image, onChange }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [_title, set_title] = useState(title)
    const [_price, set_price] = useState(price)
    const [_category, set_category] = useState(category)
    const [_image, set_image] = useState(image)
    const [deleted, setDeleted] = useState(false)
    let handleDelete = ()=> {
        console.log("deleted")
        setDeleted(true)
        reqInstance().delete(`${apiUrl}/dish/${id}`)
    }

    const putDish =()=>{
        let data = {
            id: id,
            title: _title,
            description: "update admin dish ".concat(new Date().toLocaleString()),
            rating: 5,
            category: _category,
            image: _image,
            price: _price
        }
        console.log(data)
        reqInstance().put(`${apiUrl}/dish`, data)
    }

    const handleLoadFile =(e)=>{
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            set_image(reader.result.substring(22))
        };
        reader.readAsDataURL(file);
    }

    const handleSave = ()=> {
        // console.log(_image)
        image = _image
        putDish();
        setIsEdit(false)
    }

    return(
    <tr className="adminRow" style={deleted ? {"display":"none"} : {"display": "relative"}}>
        <td className="adminString"> {isEdit ? <input type="text" value={_title} onChange={e => set_title(e.target.value)}/>: _title}</td>
        <td className="adminNumber"> {isEdit ? <input type="number" value={_price} onChange={e => set_price(e.target.value)}/>: _price}</td>
        <td className="adminString"> {isEdit ? <input type="text" value={_category} onChange={e => set_category(e.target.value)}/>: _category}</td>
        <td className="adminImage"> {isEdit ? <input type="file" accept=".png" onChange={e => handleLoadFile(e)} multiple={false}/> : <img src={'data:image/png;base64,'.concat(_image)}/>}</td>
        <td className={isEdit ? "saveButton" : "editButton"}> {isEdit ? <button onClick={handleSave}/>: <button onClick={e => setIsEdit(!isEdit)}/>}</td>
        {/*<td className="saveButton"> {isEdit ? <button onClick={handleSave}/>: <button onClick={e => setIsEdit(!isEdit)}/>}</td>*/}
        <td className="deleteButton"><button onClick={e =>handleDelete(e) }/></td>
    </tr>
)};

export default DishItem;
