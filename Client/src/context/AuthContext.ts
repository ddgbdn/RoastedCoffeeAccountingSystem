import {createContext} from 'react';

export interface IAuthData {
  accessToken: string | null,
  //accessExpiry: number | null,
  refreshToken: string | null,
  //refreshExpiry: string | null,
  //login: () => void,
  //logout: () => void
}

export interface IAuthContext {
  authData: IAuthData,
  setAuthData: (authData: IAuthData) => void
}
  
export const authContextDefaults: IAuthContext = {
  authData: {
    accessToken: null,
    //accessExpiry: null,
    refreshToken: null,
    //refreshExpiry: null,
    //login: () => {},
    //logout: () => {}
  },
  setAuthData: () => {} 
};

export const AuthContext = createContext<IAuthContext>(authContextDefaults);
