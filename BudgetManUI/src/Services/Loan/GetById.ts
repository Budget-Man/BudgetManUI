import type { LoanDto } from "@/Models/Dtos/LoanDto";
import type { LoanPayDto } from "@/Models/Dtos/LoanPayDto";
import { AppResponse } from "@/Models/AppResponse";
import { axiosInstance } from "../axiosConfig";


export const handleGetLoan = async (model: string): Promise<AppResponse<LoanDto>> => {

    let result= new AppResponse<LoanDto>();

    try {
        const respone = await axiosInstance.get("Loan/" +model);
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
