import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegisterForm } from "@/types/index";

//Crear una cuenta
export async function registerAccount(formData: UserRegisterForm) {
    try{
        const url = `/auth/create-user`;
        const { data } = await api.post<string>(url, formData)
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
//Confirmar cuenta
export async function confirmAccount(formData: ConfirmToken) {
    try{
        const url = '/auth/confirm-email';
        const { data } = await api.post<string>(url, formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
//Solicitar código de confirmación
export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try{
        const url = '/auth/request-confirmation-code';
        const { data } = await api.post<string>(url, formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
//Iniciar sesión
export async function login(formData: UserLoginForm) {
    try{
        const url = '/auth/login';
        const { data } = await api.post<string>(url, formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
//Cambiar contraseña
export async function changePassword(formData: ForgotPasswordForm){
    try{
        const url = '/auth/forgot-password';
        const { data } = await api.post<string>(url, formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
//Validar token
export async function validateToken(formData: ConfirmToken) {
    try{
        const url = '/auth/validate-token';
        const { data } = await api.post<string>(url, formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
//Actualizar contraseña
export async function updatePassword({formData, token} : {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    try{
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post<string>(url, formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}