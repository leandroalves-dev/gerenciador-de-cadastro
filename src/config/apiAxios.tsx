import axios from "axios";

const apiAxios = axios.create({
    baseURL: `http://localhost:5173`
})

export default apiAxios;