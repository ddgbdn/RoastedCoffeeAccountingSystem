import axios, { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import axiosRequest from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import './login.css'

const LoginURL = '/authentication/login';

const Login = ({setToken}: ILoginProps) => {
    const { setAuthData } = useContext(AuthContext)

    const userRef = useRef<HTMLInputElement>(null!);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');    
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

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
                }
            )
            setAuthData({
                accessToken: response?.data?.accessToken,
                refreshToken: response?.data?.refreshToken
            })    
            setUsername('');
            setPassword('');
            setSuccess(true);
        } catch (error) {
            if (axios.isAxiosError(error)){
                if (!error?.response) {
                    setErrorMessage('No Server Response');
                } else if (error.response?.status === 400) {
                    setErrorMessage('Incorrect Username or Password');
                } else {
                    setErrorMessage('LoginFailed');
                }
            }
            else {
                console.log(error);
            }
        }   

    }

    return (
        <>
            { success ? (
                <section className='login'>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href='#'> Go to Dashboard</a>
                    </p>
                </section>
            ) : (
            <section className='login'>
                <p className={errorMessage ? 'error' : 'offscreen'}>{errorMessage}</p>
                <h1 style={{textAlign: 'center'}}>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        ref={userRef} 
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
            )}
        </>
  )
}

interface ILoginProps {
    setToken: Dispatch<SetStateAction<string | null>>
}

export default Login