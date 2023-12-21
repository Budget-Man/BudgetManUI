import type { DebtDto } from "@/Models/Dtos/DebtDto";
import { AppResponse } from "@/models/AppResponse";
import { axiosInstance } from "../axiosConfig";


export const handleGetDebt = async (model: string): Promise<AppResponse<DebtDto>> => {

    let result= new AppResponse<DebtDto>();

    try {
        const respone = await axiosInstance.get("Debt/" +model);
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
