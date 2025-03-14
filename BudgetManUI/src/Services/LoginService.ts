// @ts-ignore
import type { LoginViewModel } from '../Models/LoginViewModel.ts'
// @ts-ignore
import { AppResponse } from '../Models/AppResponse.ts'
// @ts-ignore
import { axiosInstance } from "./axiosConfig.ts"

import Cookies from 'js-cookie';
// @ts-ignore
import type { LoginResult } from '@/Models/LoginResult.ts';
import router from '@/router/index.js';
import ElLoading from 'element-plus'

const loginUrl = "account/login";
const googleLoginUrl = "account/google";
const handleLogin = async (model: LoginViewModel): Promise<AppResponse<LoginResult>> => {

    let result: AppResponse<LoginResult> = ({
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
        // console.log(postResult.data);
        const responseObject = postResult.data
        result = responseObject;
        if (result.isSuccess) {

            if (result.data != undefined) {
                console.log(result.data);
                await setupLogin(result.data, model.userName);
            }
            // router.push("/");
        }
        else {
            console.log('failed');
            console.log(result.message);

        }
    } catch (error) {
        console.log('error');
        console.error(error);
        console.log(result);
        // if (axios.isAxiosError(error)) {
        //     const axiosError = error as AxiosError;
        //     if (axiosError.message.includes('timeout')){

        //     }
        // }
    }
    return result;

}
const handleLoginByGoogle = async (code: string): Promise<AppResponse<string>> => {
    // const elLoading = ElLoading;
    // const loading = ElLoading.service({
    //     lock: true,
    //     text: 'Loading',
    //     background: 'rgba(0, 0, 0, 0.7)',
    //   })
    let result: AppResponse<any> = ({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const googleLogin = {
            code: code,
            redirectUri: window.location.origin
        }
        // console.log(googleLogin);
        const postResult = await axiosInstance.post(googleLoginUrl, googleLogin);
        // console.log(postResult.data);
        const responseObject = postResult.data
        result = responseObject;
        if (result.isSuccess) {
            if (result.data != undefined) {
                // console.log(result.data);
                await setupLogin(result.data);
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
const setupLogin = async (resultData: any, userName: string | undefined = undefined) => {
    // console.log('setup login:');
    // console.log(userName);
    Cookies.set('accessToken', resultData.token ?? resultData.accessToken ?? resultData, { expires: 1 });
    Cookies.set('UserName', resultData.userName ?? userName ?? "", { expires: 1 });
    // console.log(resultData.roles);
    let roleJson = JSON.stringify(resultData.roles);
    // console.log(roleJson);
    Cookies.set('Roles', roleJson ?? "", { expires: 1 });

    //need to get value of user setting from bank-end
    //set temporary language
    // Cookies.set('language', 'en', { expires: 30 });
    //set temporary currency
    // Cookies.set('currency', 'VND', { expires: 30 });
}
export { handleLogin, handleLoginByGoogle }

