// @ts-ignore
import { AppResponse } from "@/models/AppResponse.js";
import  { CreateMoneySpendRequest } from "@/Models/Request/MoneySpend/CreateMoneySpendRequest.js";
import { axiosInstance } from "../axiosConfig";
const moneyspendUrl = "moneyspend";

export const handleAPIUpdateMoneySpend = async (model: CreateMoneySpendRequest): Promise<AppResponse<string>> => {

    let result= new AppResponse<string>();

    try {
        const postResult = await axiosInstance.post(moneyspendUrl, model);
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