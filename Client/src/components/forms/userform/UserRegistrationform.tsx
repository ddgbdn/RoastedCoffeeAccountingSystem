import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import axios from 'axios'

const UserRegistrationform = ({handleMutationSync}: IRegistrationFormProps) => {
    const [user, setUser] = useState(deafultFormUser)
    const [errors, setErrors] = useState<string[]>([])

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setErrors([]);
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axiosPrivate.post(
                '/authentication',
                JSON.stringify(user)
            )
            setUser(deafultFormUser);
            await handleMutationSync();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error?.response) {
                  setErrors(['No Server Response']);
                } else if (error.response?.status === 422 || error.response?.status === 400) {
                  processEntityError(error.response.data);
                } else {
                  setErrors(['Saving Failed']);
                }
            }
        }
    }
    
    const processEntityError = (data: IEntityError) => {
        Object.values(data).forEach(v => setErrors(prev => [...prev, v]))
    }

    return (
        <div className='formGridEl'>
            <div className='formContainer'>
                <form onSubmit={handleSubmit}>
                    {
                        errors.map((error) => 
                        <p className={error ? 'error' : 'offscreen'}>{error}</p>)
                    }
                    <h3>Register</h3>
                    <input
                        type='text' 
                        placeholder='First Name(optional)'
                        value={user.firstName}
                        onChange={(e) => setUser((prev) => {return {...prev, firstName: e.target.value}})}
                    />
                    <input
                        type='text' 
                        placeholder='Last Name(optional)'
                        value={user.lastName}
                        onChange={(e) => setUser((prev) => {return {...prev, lastName: e.target.value}})}
                    />
                    <input
                        type='text' 
                        placeholder='UserName'
                        required
                        value={user.userName}
                        onChange={(e) => setUser((prev) => {return {...prev, userName: e.target.value}})}
                    />
                    <input
                        type='password' 
                        placeholder='Password'
                        value={user.password}
                        onChange={(e) => setUser((prev) => {return {...prev, password: e.target.value}})}
                    />
                    <select
                        title='roles'
                        onChange={(e) => setUser(prev => {
                            return {...prev, roles: e.target.value.split(', ')}
                        })}
                    >
                        <option value={"Viewer"}>Viewer</option>
                        <option value={"Viewer, Manager"}>Manager</option>
                        <option value={"Viewer, Manager, Administrator"}>Administrator</option>
                    </select>
                    <button 
                        type='submit' 
                        className='formButton'
                        style={{margin: "30px 0px 70px 0px"}}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

interface IEntityError {
    userName: string | undefined,    
    passwordTooShort: string | undefined, 
    passwordRequiresDigit: string | undefined, 
    passwordRequiresUpper: string | undefined, 
}

interface IRegistrationFormProps {
    handleMutationSync: () => void
}

interface IFormUser {
    firstName?: string,
    lastName?: string,
    userName: string,
    password: string,
    roles: string[]
}

const deafultFormUser: IFormUser = {
    userName: '',
    password: '',
    roles: []
}

export default UserRegistrationform