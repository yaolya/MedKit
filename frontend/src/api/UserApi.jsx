import axios from "axios";

export default class UserApi {
    static async getAllUsers(limit= 10, page= 1) {
        try {
            const response = await axios.get('/users')
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

    static async getUserById(id) {
        const url = '/users/' + id.toString()
        const response = await axios.get(url)
        return response;
    }

    static async loginUser(user) {
        const response = await axios.post('/users/login', user)
        return response;
    }

    static async logoutUser() {
        const response = await axios.post('/users/logout', '')
        return response;
    }
}