import axios from 'axios';
const baseURL ='https://brewplaceroastery.azurewebsites.net/api';
//const baseURL ='http://www.brewplaceroastery.bp/api';

export default axios.create({
    baseURL: baseURL
});

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type' : 'application/json'},
    withCredentials: true
});