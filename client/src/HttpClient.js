import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3005/api/v1';

export default class HttpClient {

    constructor(baseUrl, headers) {
        this.baseUrl = baseUrl || apiUrl;
        this.headers = headers;
    }

    getToken() {
        return localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    }

    getHeaders() {
        return {
            headers: {
                'jwt': this.getToken(),
                'content-type': 'application/json',
                ...this.headers     
            }
        }
    }

    async get(url) {
        try {
            const response = await axios.get(this.baseUrl + url, this.getHeaders());
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(response);
                return {code: response.status, msg: response.statusText};
            }
        }
        catch (error) {
            console.error(error);
            return {code: error.code || -1, msg: error.message || 'Unknown'};
        }
    }

    async patch(url, data) {
        try {
            const response = await axios.patch(this.baseUrl + url, data, this.getHeaders());
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(response);
                return {code: response.status, msg: response.statusText};
            }
         }
         catch (error) {
            console.error(error);
            return {code: error.code || -1, msg: error.message || 'Unknown'};
        }
    }

    async post(url, data) {
        try {
            const response = await axios.post(this.baseUrl + url, data, this.getHeaders());
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(response);
                return {code: response.status, msg: response.statusText};
            }
         }
         catch (error) {
            console.error(error);
            return {code: error.code || -1, msg: error.message || 'Unknown'};
        }
    }

    async put(url, data) {
        try {
            const response = await axios.put(this.baseUrl + url, data, this.getHeaders());
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(response);
                return {code: response.status, msg: response.statusText};
            }
         }
         catch (error) {
            console.error(error);
            return {code: error.code || -1, msg: error.message || 'Unknown'};
        }
    }

}
