import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { ChangePasswordForm, UserFormData } from "@/types";

//Actualizar perfil
export async function updateProfile(formData: UserFormData) {
    try{
        const { data } = await api.put<string>('/auth/profile', formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
//Actualizar contraseña
export async function changePasswordUser(formData: ChangePasswordForm){
    try{
        const { data } = await api.post<string>('/auth/update-password', formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}