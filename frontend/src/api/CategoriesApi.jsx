import axios from "axios";

export default class CategoriesApi {
    static async getAllCategories() {
        try {
            const response = await axios.get('/categories/all')
            return response
        } catch (e) {
            if (e.response) {
                if (e.response.status === 401)
                    return null
            }
            else {
                console.log(e)
                return null
            }
        }
    }

    static async getCategoryById(id) {
        const response = await axios.get('/categories/' + id)
        return response;
    }

    static async getUsersCategories() {
        const response = await axios.get('/categories/users')
        return response;
    }

    static async getDefaultCategories() {
        const response = await axios.get('/categories/default')
        return response;
    }

    static async addCategory(category) {
        const response = await axios.post('/categories/', category)
        return response;
    }

    static async deleteCategory(id) {
        const response = axios.delete('/categories/' + id)
        return response;
    }

    static async getMedicamentsByCategoryId(id) {
        console.log(`/categories/${id}/medicaments`)
        const response = await axios.get(`/categories/${id}/medicaments`)
        return response;
    }

    static async addMedicamentToCategory(medicament_id, category_id) {
        const response = await axios.post('/categories/'+medicament_id+'/'+category_id)
        return response;
    }

    static async removeMedicamentFromCategory(category_id, medicament_id) {
        const response = await axios.delete('/categories/'+medicament_id+'/'+category_id)
        return response;
    }
}