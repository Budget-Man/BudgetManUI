// @ts-ignore
import { LoginViewModel } from '../models/LoginViewModel.ts'
// @ts-ignore
import {baseUrlService} from "./axiosConfig.ts"
 

const loginUrl = "account/login";

export const Login = (model: LoginViewModel) => {
    baseUrlService.post(loginUrl,model)
    .then(responseData => {
        // Handle the successful response
        console.log('Server response:', responseData);
        return responseData;
    })
    .catch(error => {
        // Handle any errors that occur during the fetch request
        console.error('Error sending data:', error);
    });
   
}

