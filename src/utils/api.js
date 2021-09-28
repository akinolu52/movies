// import { toast } from '@utils';
import axios from 'axios';

export const MOVIE_DB_API_KEY = '6602e16a2113f244e6ec2c2dcca2770a';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/';

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
    api.interceptors.request.use(
        async config => {
            console.log('config -> ', config);
            return config;
        },
        error => Promise.reject(error)
    );

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
        get: async url => {
            console.log('url -> ' + url);
            return api.get(url).then(({ data }) => data);
        },

        post: async values => {
            // token = await getToken();
            const [url, form] = values;
            console.log('url', url, form);
            return api.post(url, form).then(({ data }) => data);
        },
    }
}

export const api = apiResource();
