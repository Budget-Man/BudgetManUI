import type { AppResponse } from "@/Models/AppResponse";
import type { ChatMessageModel } from "@/Models/ChatMessageModel";
import { axiosInstance } from "@/Services/axiosConfig";

export const sendRequestMessage = async (model: ChatMessageModel): Promise<string> => {
    try {
        const response: AppResponse<string> = await axiosInstance.post('/message', model)

        if (response.isSuccess) {
            return response.data || 'I have no idea!'
        }
        throw new Error()
    }
    catch {
        return "Opps! Something went wrong. Try again please."
    }
}