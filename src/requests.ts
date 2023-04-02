import axios from "axios";

export const server = axios.create({
    baseURL: 'http://10.10.117.156:8080/api/',
    timeout: 10000,
});

