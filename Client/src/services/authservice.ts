import axios from "../api/axios"

export const login = async (credentials: ICredentials) => {
    const response = await axios.post('/authentication/login', credentials);

    if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
}

export const logout = () => {
    localStorage.removeItem("user");
};
  
export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
};

interface ICredentials {
    username: string,
    password: string
}