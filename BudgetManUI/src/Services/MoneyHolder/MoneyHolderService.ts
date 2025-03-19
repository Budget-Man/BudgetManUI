import type { MoneyHolderDto } from "@/Models/Dtos/MoneyHolderDto";
import { AppResponse } from "@/Models/AppResponse";
import { axiosInstance } from "../axiosConfig";


export const handleGetMoneyHolderDetails = async (model: string): Promise<AppResponse<MoneyHolderDto>> => {

    let result= new AppResponse<MoneyHolderDto>();

    try {
        const respone = await axiosInstance.get("MoneyHolder/" +model);
        console.log(respone.data);
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
