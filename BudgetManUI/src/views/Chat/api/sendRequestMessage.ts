import type { AppResponse } from "@/Models/AppResponse";
import type { ChatMessageModel } from "@/Models/ChatMessageModel";
import { axiosInstance } from "@/Services/axiosConfig";

export const sendRequestMessage = async (model: ChatMessageModel): Promise<string> => {
    try {
        console.log(model)
        const response: AppResponse<any> = await axiosInstance.post('/message', {...model, images: model?.images?.map((item)=>item.split(",")[1])})
        const responseObject = response.data;
        console.log(response)
        // if (responseObject.isSuccess) {
            return responseObject.message || 'I have no idea!'
        // }
        throw new Error()
    }
    catch {
        return "Opps! Something went wrong. Try again please."
    }
}