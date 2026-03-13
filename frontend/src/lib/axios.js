import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true //by adding this feild, browser will send the cookies automatically,on evry single req
})

export default axiosInstance;