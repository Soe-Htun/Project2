import axios from "axios";

const http = axios.create();
http.interceptors.request.use(
    function(config) {
        config.baseURL = import.meta.env.VITE_APP_BASE_URL;
        config.headers['Content-Type'] = "application/json";
        return config;
    },
    function error() {
        return Promise.reject(error);
    }
);

// http.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     (error) => {
//         if(error.response.status == 401) {
//             const store= useAuth();
//             const user = {
//                 name: "",
//                 id: "",
//                 login: ""
//             };

//             store.user = user;
//             store.token = "";
//             store.roles = [];
//             store.permissions = [];
//             store.$reset();
//             router.push({ name: 'login' })
//         }
//         return Promise.reject(error);
//     }
// )

export const HTTP = http;
