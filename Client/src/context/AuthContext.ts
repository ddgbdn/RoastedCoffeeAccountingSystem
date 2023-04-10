import {createContext, Dispatch, SetStateAction} from 'react';

export interface IAuthData {
  accessToken: string | null,
  refreshToken: string | null,
}

export interface IAuthContext {
  authData: IAuthData,
  setAuthData: Dispatch<SetStateAction<IAuthData>>
}
  
export const authContextDefaults: IAuthContext = {
  authData: {
    accessToken: null,
    refreshToken: null,
  },
  setAuthData: () => {} 
};

export const AuthContext = createContext<IAuthContext>(authContextDefaults);
