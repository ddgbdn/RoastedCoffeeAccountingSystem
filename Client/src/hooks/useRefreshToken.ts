import axios from '../api/axios';
import useAuth from './useAuth'

const useRefreshToken = () => {
  const auth = useAuth();

  const refresh = async () => {
    const response = await axios.post(
     '/token/refresh', 
    auth.authData,
    {
      withCredentials: true
    });
    console.log(response.data.accessToken)
    auth.setAuthData(response.data)
    return response.data.accessToken;
  }

  return refresh;
}

export default useRefreshToken