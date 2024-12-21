import axios from 'axios';
import {BaseURL} from "./Endpoints.ts";

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

const Client = axios.create({
    baseURL: BaseURL,
    timeout: 20000,
    headers: {
        Authorization: '',
        'content-type': 'application/json',
    },
});

Client.interceptors.request.use(
    async function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

Client.interceptors.response.use(
    async function (response) {
        return response;
    },
    function (error) {
        if(error.response){
            return error.response;
        }
        return Promise.reject(error);
    }
);

export async function request(method: Method, url: string, data?: any): Promise<any> {
    try {
        return await Client.request({
            method,
            url,
            data: method === 'get' ? undefined : data,
        });
    } catch (error) {
        console.error(error);
        return error;
    }
}
