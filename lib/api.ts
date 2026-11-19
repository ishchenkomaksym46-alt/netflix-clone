import axios from "axios";

export const api = axios.create({
    baseURL: 'https://netflix-clone-backend-9s97.onrender.com',
    withCredentials: true
})