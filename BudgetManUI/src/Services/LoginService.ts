// @ts-ignore
import { LoginViewModel } from '../models/LoginViewModel.ts'
// @ts-ignore
import { AppResponse } from '../models/AppResponse.ts'
// @ts-ignore
import { axiosInstance } from "./axiosConfig.ts"

import Cookies from 'js-cookie';

const loginUrl = "account/login";
const googleLoginUrl = "account/google";
const handleLogin = async (model: LoginViewModel): Promise<AppResponse<string>> => {

    let result: AppResponse<string>=({
        isSuccess: false,
        message: '',
        data: ''
    });

    try {
        const postResult = await axiosInstance.post(loginUrl, model);
        console.log(postResult.data);
        const responseObject = postResult.data
        result = responseObject;
        if (result.isSuccess) {
            
            if(result.data!=undefined){
                
                console.log(result.data);
                setupLogin(model.userName, result.data);
                // Cookies.set('accessToken', result.data, { expires: 1 });
                // Cookies.set('UserName',model.userName, { expires: 1 });

                // //need to get value of user setting from bank-end
                // //set temporary language
                // Cookies.set('language', 'en', { expires: 30 });
                // //set temporary currency
                // Cookies.set('currency', 'VND', { expires: 30 });
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
                console.log(result.data);
                Cookies.set('accessToken', result.data.accessToken, { expires: 1 });
                Cookies.set('UserName',result.data.userName, { expires: 1 });

                //need to get value of user setting from bank-end
                //set temporary language
                Cookies.set('language', 'en', { expires: 30 });
                //set temporary currency
                Cookies.set('currency', 'VND', { expires: 30 });
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
function setupLogin(username: string, accessToken:string )
{
        Cookies.set('accessToken', accessToken, { expires: 1 });
        Cookies.set('UserName',username, { expires: 1 });

        //need to get value of user setting from bank-end
        //set temporary language
        Cookies.set('language', 'en', { expires: 30 });
        //set temporary currency
        Cookies.set('currency', 'VND', { expires: 30 });
}
export { handleLogin, handleLoginByGoogle}

