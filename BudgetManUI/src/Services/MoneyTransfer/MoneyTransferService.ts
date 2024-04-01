// @ts-ignore
import { AppResponse } from "@/Models/AppResponse.js";
import { axiosInstance } from "../axiosConfig";
import type { MoneyTransferDto } from "@/Models/Dtos/MoneyTransferDto";
const moneytransferUrl = "LocalTransfer";

export const handleAPICreateMoneyTransfer = async (model: MoneyTransferDto): Promise<AppResponse<string>> => {

    let result= new AppResponse<string>();

    try {
        const postResult = await axiosInstance.post(moneytransferUrl, model);
        console.log(postResult.data);
        const responseObject = postResult.data
        result = responseObject;
       return result;
    } catch (error) {
        console.error(error);
        result.isSuccess=false;
        result.message= JSON.stringify(error);
    }
    return result;

}