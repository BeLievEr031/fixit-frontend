import axios from "axios";
// import { useAuthStore } from "../store";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

// const refreshToken = () => api.post("/auth/refresh")

// const refreshToken = async () => {
//     try {
//         await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`, {}, {
//             withCredentials: true,
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//             },
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }


// api.interceptors.response.use((response) => {
//     return response;
// }, async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._isRetry) {
//         try {
//             originalRequest._isRetry = true;
//             const headers = { ...originalRequest.headers };
//             await refreshToken();
//             return api.request({ ...originalRequest, headers });
//         } catch (err) {
//             useAuthStore.getState().logout();
//             return Promise.reject(err);
//         }
//     }
//     return Promise.reject(error);
// })


export default api;