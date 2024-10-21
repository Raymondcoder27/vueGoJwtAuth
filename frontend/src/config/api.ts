import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
})

api.interceptors.request.use((config)=>{
    return config
})

api.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(error.response != undefined && error.response.status === 401){

        }

        return Promise.reject(error)
    }
)

export default api