// @ts-ignore
import { LoginViewModel } from '../Models/LoginViewModel.ts'
// @ts-ignore
import { AppResponse } from '../Models/AppResponse.ts'
// @ts-ignore
import { axiosInstance } from "./axiosConfig.ts"

import Cookies from 'js-cookie';
import type { LoginResult } from '@/Models/LoginResult.js';
import router from '@/router/index.js';

const loginUrl = "account/login";
const googleLoginUrl = "account/google";
const handleLogin = async (model: LoginViewModel): Promise<AppResponse<LoginResult>> => {

    let result: AppResponse<LoginResult>=({
        isSuccess: false,
        message: '',
        data: {
            token: '',
            userName: '',
            roles: []
        }
    });

    try {
        const postResult = await axiosInstance.post(loginUrl, model);
        console.log(postResult.data);
        const responseObject = postResult.data
        result = responseObject;
        if (result.isSuccess) {
            
            if(result.data!=undefined){
                console.log(result.data);
                setupLogin(result.data, model.userName);
            }
            router.push("/");
        }
        else {
            console.log(result.message);

        }
    } catch (error) {
        console.error(error);

    }
    return result;

}
const handleLoginByGoogle = async (code: string): Promise<AppResponse<string>> => {

    let result: AppResponse<any>=({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const googleLogin = {
            code : code,
            redirectUri: window.location.origin
        }
        console.log(googleLogin);
        const postResult = await axiosInstance.post(googleLoginUrl, googleLogin );
        console.log(postResult.data);
        const responseObject = postResult.data
        result = responseObject;
        if (result.isSuccess) {
            if(result.data!=undefined){
                // console.log(result.data);
                setupLogin(result.data);
            }
            
        }
        else {
            console.log(result.message);

        }
    } catch (error) {
        console.error(error);

    }
    return result;

}
const setupLogin = (resultData: any , userName :string | undefined = undefined) =>
{
    // console.log(resultData);
    // console.log(userName);
    Cookies.set('accessToken', resultData.accessToken ?? resultData, { expires: 1 });
    Cookies.set('UserName',resultData.username ?? userName?? "", { expires: 1 });
    Cookies.set('Roles', resultData.roles ?? JSON.stringify(resultData.roles) ?? "", { expires: 1 });
    //need to get value of user setting from bank-end
    //set temporary language
    // Cookies.set('language', 'en', { expires: 30 });
    //set temporary currency
    // Cookies.set('currency', 'VND', { expires: 30 });
}
export { handleLogin, handleLoginByGoogle}

