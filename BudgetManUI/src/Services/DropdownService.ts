import  { DropdownDto } from "@/Models/Dtos/DropdownDto";
import  { SearchDTOItem } from "@/components/maynghien/adminTable/Models/SearchDTOItem";
import  { AppResponse } from "@/models/AppResponse";
import { axiosInstance } from "./axiosConfig";

export const handleGetDropdownList = async (apiurl: string): Promise<AppResponse<DropdownDto[] | undefined>> => {

    let resust: AppResponse<DropdownDto[] | undefined> = ({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const listResult = await axiosInstance.get(apiurl);
        
        const responseObject = listResult.data
        resust = responseObject;
        if (resust.isSuccess) {
            return resust;
        }
        else {
            console.log(resust.message);
            return resust;
        }
    } catch (error) {
        console.error(error);

    }
    return resust;

}