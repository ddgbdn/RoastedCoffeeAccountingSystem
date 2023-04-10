import { PropsWithChildren, useState } from 'react'
import { AuthContext, authContextDefaults, IAuthData } from './AuthContext';

const AuthProvider = ({children} : PropsWithChildren) => {
    const [auth, setAuth] = useState<IAuthData>(authContextDefaults.authData);

    return (
        <AuthContext.Provider value={{authData: auth, setAuthData: setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider