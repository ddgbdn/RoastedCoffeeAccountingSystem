
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken"

const useAxiosPrivate = () => {
    let refreshFunc: Promise<string> | undefined

    const navigate = useNavigate()

    const refresh = useRefreshToken();

    axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
            }
            return config;
        }, 
        (error) => Promise.reject(error)
    )

    axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 401 && !prevRequest?.sent) {
                try {
                    if (!refreshFunc) {
                        refreshFunc = refresh();
                    }
                    const newAccessToken: string = await refreshFunc;
                    
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    try {
                        return await axiosPrivate.request(prevRequest);
                    } catch(innerError) {
                        navigate('/');
                    }
                } catch (err) {
                    navigate('/');
                } finally {
                    refreshFunc = undefined;
                }
            }
            return Promise.reject(error)
        }
    ) 

    return axiosPrivate;
}

export default useAxiosPrivate