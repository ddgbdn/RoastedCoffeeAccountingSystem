import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosRequest from '../../api/axios';
import useAuth from '../../hooks/useAuth'
import './login.css'

const LoginURL = '/authentication/login';

const Login = () => {
    const { setAuthData } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axiosRequest.post(
                LoginURL,
                JSON.stringify({username, password}),
                { 
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                },
            )
            setAuthData({
                accessToken: response?.data?.accessToken,
                refreshToken: response?.data?.refreshToken
            })    
            setUsername('');
            setPassword('');
            navigate('/dashboard', {replace: true});
        } catch (error) {
            if (axios.isAxiosError(error)){
                if (!error?.response) {
                    setErrorMessage('No Server Response');
                } else if (error.response?.status === 401) {
                    setErrorMessage('Incorrect Username or Password');
                } else {
                    setErrorMessage('Login Failed');
                }
            }
            else {
                console.log(error);
            }
        }
    }

    return (        
        <section className='login'>
            <p className={errorMessage ? 'error' : 'offscreen'}>{errorMessage}</p>
            <h1 style={{textAlign: 'center'}}>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    type="text" 
                    id="username"
                    autoComplete='off'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required   
                />
                <label htmlFor='password'>Password:</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required   
                />
                <button>Sign In</button>
            </form>
        </section>        
    )
}

export default Login
