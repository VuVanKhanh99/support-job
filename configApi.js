import axios from 'axios';

export const getApi = axios.create({
    baseURL:'http://192.168.13.107:3000/',
    timeout:4000,
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
})