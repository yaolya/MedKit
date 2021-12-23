import React, {useContext, useEffect, useState} from 'react';
import MedicamentItem from "../components/medicament/MedicamentItem";
import {AdminContext} from "../context";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import CategoriesApi from "../api/CategoriesApi";
import MyModal from "../components/UI/MyModal/MyModal";
import CategoryForm from "../components/category/CategoryForm";
import CategoriesFilter from "../components/category/CategoriesFilter";
import CategoriesList from "../components/category/CategoriesList";
import MyButton from "../components/UI/button/MyButton";
import ListsApi from "../api/ListsApi";
import ProductProfileItem from "../components/list/ProductProfileItem";
import ProfileList from "../components/list/ProfileList";


const Profile = () => {
    const [products, setProducts] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [expiredProducts, setExpiredProducts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});

    const [fetchProducts, isProductsLoading, productsError] = useFetching(async () => {
        const response = await ListsApi.getNotExpiredProducts();
        const response2 = await ListsApi.getExpiredProducts();
        setProducts(response.data)
        setExpiredProducts(response2.data)
    });

    useEffect(async () => {
            fetchProducts();
        }, []
    )

    useEffect( () => {
        }, [deleted]
    )

    const removeProduct = (product) => {
        setProducts(products.filter(p => p.id !== product.id))
        setExpiredProducts(expiredProducts.filter(p => p.id !== product.id))
        ListsApi.deleteProduct(product.id).then(function(response) {
            console.log(response)
        })
        setDeleted(!deleted)
    }

    return (
        <div className="medicaments">
            <h1 className="title">
                Profile
            </h1>
            <hr style={{margin: '15px 0'}}/>
            {productsError &&
            alert(`error: ${productsError}`)
            }
            {isProductsLoading
                ? <h1>loading...</h1>
                : <div><ProfileList remove={removeProduct} products={expiredProducts} title="Срок годности истёк" classname="profile__expireditem"/>
                <ProfileList remove={removeProduct} products={products} title="Мои препараты" classname="medicament"/></div>
            }
        </div>
    );
}


export default Profile;