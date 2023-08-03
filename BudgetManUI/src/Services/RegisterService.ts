// @ts-ignore
import { RegisterViewModel } from '../models/RegisterViewModel.ts'
// @ts-ignore
import { AppResponse } from '../models/AppResponse.ts'
// @ts-ignore
import { axiosInstance } from "./axiosConfig.ts"

import Cookies from 'js-cookie';
import { reactive } from 'vue';
const registerUrl = "account/register";

export const handleRegister = async (model: RegisterViewModel): Promise<AppResponse<string>> => {

    let result: AppResponse<string>=({
        isSuccess: false,
        message: '',
        data: ''
    });

    try {
        const postResult = await axiosInstance.post(registerUrl, model);
        console.log(postResult.data);
        const responseObject = postResult.data
        result = responseObject;
       return result;
    } catch (error) {
        console.error(error);

    }
    return result;

}

