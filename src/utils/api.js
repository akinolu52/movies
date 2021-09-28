// import { toast } from '@utils';
import axios from 'axios';

export const MOVIE_DB_API_KEY = '7315ec59ea2264da1fa4f4eb8d647853';
const BASE_URL = `https://api.themoviedb.org/3/movie/76341`;

const apiResource = () => {

    const api = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': BASE_URL,
        },
    });
    // api.interceptors.request.use(
    //     async config => {
    //         const token = await getToken();
    //         // console.log('token from api -> ', token);
    //         if (!token) return config;

    //         config.headers['Authorization'] = token;
    //         config.headers['Fingerprint'] = DeviceInfo.getUniqueId();
    //         // console.log('config -> ', config);
    //         return config;
    //     },
    //     error => Promise.reject(error)
    // );

    api.interceptors.response.use(response => {
        // console.log('response from api -> ', response);
        return response
    }, error => {
        const errorData = error?.response?.data;
        // if (+errorData?.code === 401) {
        //     removeToken();
        // }
        // console.log('error from api -> ', error);

        // toast(errorData?.description, 'error');
        return Promise.reject(errorData);
    });

    return {
        get: async url => api.get(url).then(({ data }) => data),

        post: async values => {
            // token = await getToken();
            const [url, form] = values;
            console.log('url', url, form);
            return api.post(url, form).then(({ data }) => data);
        },
    }
}

export const api = apiResource();
