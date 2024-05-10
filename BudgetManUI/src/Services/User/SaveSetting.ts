import { axiosInstance } from "../axiosConfig";
import { AppResponse } from "@/Models/AppResponse";
// @ts-ignore
import { SettingViewModel } from '../Models/SettingViewModel';
const saveSettingUrl = "account/savesetting";

export const handleSaveSetting = async (model: SettingViewModel): Promise<AppResponse<string>> => {

    let result= new AppResponse<string>();

    try {
        // console.log(model);
        const respone = await axiosInstance.put(saveSettingUrl, model);
        // console.log(respone.data);
        const responseObject = respone.data
        result = responseObject;
       return result;
    } catch (error) {
        console.error(error);
        result.isSuccess=false;
        result.message= JSON.stringify(error);
    }
    return result;

}