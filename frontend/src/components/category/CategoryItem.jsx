import React, {useContext} from 'react';
import MyButton from "../UI/button/MyButton";
import {AdminContext} from "../../context";
import {useNavigate} from "react-router-dom";

const CategoryItem = (props) => {
    const {isAdmin, setIsAdmin} = useContext(AdminContext);
    const navigate = useNavigate()
    return (
        <div className="medicament">
            <div className="medicament__content">
                <strong className="items__titles">{props.category.name} </strong>
                <div>
                    {props.category.description}
                </div>
            </div>
            {isAdmin
                ?
                <div className="medicament__btns">
                    <MyButton onClick={() => props.remove(props.category)}>удалить</MyButton>
                </div>
                : props.category.is_default
                    ?
                <div className="medicament__btns">
                    <MyButton onClick={() => navigate(`/categories/${props.category.id}`)}>открыть</MyButton>
                </div>
                    :
                    <div className="medicament__btns">
                        <MyButton onClick={() => props.remove(props.category)}>удалить</MyButton>
                        <MyButton onClick={() => navigate(`/categories/${props.category.id}`)}>открыть</MyButton>
                    </div>
            }
        </div>
    );
};

export default CategoryItem;