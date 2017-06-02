import axios from 'axios';
import environment from 'environment';

export const checkUsername = (username) => {
    return axios.get(`${environment.backendUrl}/api/auth/check-username/${username}`);
}

export const register = (username) => {
    return axios.post(`${environment.backendUrl}/api/auth/register`, {
        username
    });
}

export const linkAccount = (token) => {
    return axios.post(`${environment.backendUrl}/api/auth/link-account`, {
        token
    });
}