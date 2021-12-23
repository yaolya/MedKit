import React, {useContext, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import CategoriesApi from "../../api/CategoriesApi";
import {AdminContext} from "../../context";

const CategoryForm = ({create}) => {
    const {isAdmin, setIsAdmin} = useContext(AdminContext);
    const [category, setCategory] = useState({name: '', description: '', is_default: isAdmin})
    const addNewCategory = (e) => {
        e.preventDefault()
        setCategory({name: '', description: '', is_default: isAdmin})
        CategoriesApi.addCategory(category).then(function(response) {
            const newCategory = {
                ...category, id: response.data.id
            }
            create(newCategory)
        })
    }
    return (
        <form>
            <MyInput
                value={category.name}
                onChange={e => setCategory({...category, name: e.target.value})}
                type="text"
                placeholder="name"
            />
            <MyInput
                value={category.description}
                onChange={e => setCategory({...category, description: e.target.value})}
                type="text"
                placeholder="description"
            />
            {isAdmin
            ? <MyButton onClick={addNewCategory}>add default category</MyButton>
            : <MyButton onClick={addNewCategory}>add category</MyButton>
            }
        </form>
    );
};

export default CategoryForm;