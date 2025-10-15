const API_BASE_URL = 'http://localhost:8080/api';
import axios from "axios";

//pre configured axios instance
const api = axios.create({
    baseURL:API_BASE_URL,
});

//These functions talk to springboot backend
export const userService = {
    //GET /api/users - get all users from backend
    getAllUsers:()=>api.get('/users'),

    //POST /api/users - create new user in backend
    createUser:(userData)=>api.post('/users',userData),

    //GET /api/users/1 - get userby id
    getUserById:(id)=>api.get('/users/${id}'),
};