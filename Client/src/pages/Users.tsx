import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import UserTable from '../components/tables/usertable/UserTable'
import UserRegistrationform from '../components/forms/userform/UserRegistrationform'

const Users = () => {
    const [users, setUsers] = useState<User[]>([defaultUser])

    const axiosPrivate = useAxiosPrivate()

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get('/authentication/users');
            setUsers(response.data);
        } catch (error) {
            console.error()
        }
    }

    useEffect(() => {
        getUsers();
    }, [axiosPrivate])

    

    return (
        <div className='usersPage'>
            <UserTable users={users} handleMutationSync={getUsers}/>
            <UserRegistrationform handleMutationSync={getUsers}/>
        </div>
    )
}

export interface User {
    userName: string,
    fullName: string,
    roles: string[]
}

const defaultUser: User = {
    userName: '',
    fullName: '',
    roles: ['']
}

export default Users