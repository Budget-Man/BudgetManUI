// @ts-ignore
import { LoginViewModel } from '../models/LoginViewModel.ts'
// @ts-ignore
import { axiosInstance } from "./axiosConfig.ts"

import Cookies from 'js-cookie';
const loginUrl = "account/login";

export const handleLogin = async (model: LoginViewModel): Promise<boolean> => {

   
    try{
       const postResult= await axiosInstance.post(loginUrl, model);
       Cookies.set('accessToken', postResult.data, { expires: undefined });

    }catch (error) {
        console.error(error);
       return false;
      }
     
    return true;
}

