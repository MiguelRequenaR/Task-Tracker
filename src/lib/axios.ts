import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
})

//Interceptors se usan para manejar las peticiones y las respuestas
//Request se envian antes de la peticion http
//Response en base a la respuesta de la peticion http
api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN');
    //Si existe el token, se pasa la configuracion con los headers
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;