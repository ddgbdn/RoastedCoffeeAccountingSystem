import axios from '../api/axios';

const useRefreshToken = () => {

  const refresh = async (): Promise<string> => {
    const response = await axios.post(
     '/token/refresh', 
    {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken")
    },
    {
      withCredentials: true
    });
    localStorage.setItem("accessToken", response.data.accessToken)
    localStorage.setItem("refreshToken", response.data.refreshToken)
    return response.data.accessToken;
  }

  return refresh;
}

export default useRefreshToken