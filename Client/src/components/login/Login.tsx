import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosRequest from '../../api/axios';
import './login.css'

const LoginURL = '/authentication/login';

const Login = () => {
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
            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem("refreshToken", response.data.refreshToken)

            setUsername('');
            setPassword('');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1);            
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
        <div className='login'>
            <p className={errorMessage ? 'error' : 'offscreen'}>{errorMessage}</p>
            <h2 style={{textAlign: 'center', margin: 30}}>Sign In</h2>
            <form onSubmit={handleSubmit} className='loginForm'>
                <input 
                    type="text" 
                    id="username"
                    autoComplete='off'
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required   
                />
                <input 
                    type="password" 
                    id="password"
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required   
                />
                <button className='loginButton'>Sign In</button>
            </form>
        </div>        
    )
}

export default Login
