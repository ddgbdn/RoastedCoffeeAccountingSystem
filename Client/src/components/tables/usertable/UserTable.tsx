import React from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { User } from '../../../pages/Users'

const UserTable = ({users, handleMutationSync}: IUserTableProps) => {
    const axiosPrivate = useAxiosPrivate()

    const handleDelete = async (username: string) => {
        try {
            await axiosPrivate.delete('/authentiaction/user', {
                data: {
                    username: username
                }
            })
            await handleMutationSync()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='userTable'>
            <table>
                <thead>
                    <tr style={{
                        backgroundColor: "#191919"
                    }}>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Roles</th>
                        <th style={{
                            textAlign: "right"
                        }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{user.userName}</td>
                                <td>{user.fullName}</td>
                                <td>{user.roles.join(', ')}</td>
                                <td style={{
                                    textAlign: 'right'
                                }}>
                                    <button 
                                        className='actionButton delete'
                                        onClick={async() => await handleDelete(user.userName)}
                                    >
                                        <i className='bi bi-trash3'/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
  )
}

interface IUserTableProps {
    users: User[]
    handleMutationSync: () => void
}

export default UserTable