import axios from 'axios';

export default axios.create({
    baseURL: 'http://www.brewplaceroastery.bp/api'
});