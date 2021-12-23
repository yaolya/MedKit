import axios from "axios";

export default class ListsApi {

    static async getProducts() {
        const response = await axios.get('/products/withoutquantity')
        return response;
    }

    static async getExpiredProducts() {
        const response = await axios.get('/products/expired')
        return response;
    }

    static async getNotExpiredProducts() {
        const response = await axios.get('/products/notexpired')
        return response;
    }

    static async getProductsForProfile() {
        const response = await axios.get('/products/withdate')
        return response;
    }

    static async getProductsForList() {
        const response = await axios.get('/products/withoutdate')
        return response;
    }

    static async getProductsForMedicament(id) {
        const response = await axios.get('/products/'+id)
        return response;
    }

    static async addProduct(product) {
        const response = await axios.post('/products/', product)
        return response;
    }

    static async addExpirationDate(id, product) {
        if (id) {
        const response = await axios.put('/products/' + id, product)
        return response;}
        else {
            return JSON.stringify(product)
        }
    }

    static async deleteProductsForMedicament(id) {
        const response = axios.delete('/products/formedicament/' + id)
        return response
    }

    static async deleteProduct(id) {
        const response = axios.delete('/products/' + id)
        return response
    }
}