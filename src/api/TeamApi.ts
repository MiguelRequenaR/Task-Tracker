import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMemberForm, Team, teamMemberSchema } from "@/types";

//Buscamos el colaborador
export async function findUser ({projectId, formData} : {projectId: Project['_id'], formData: TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

//Agregamos el colaborador al proyecto
export async function addMember({projectId, id} : {projectId: Project['_id'], id: Team['_id']}) {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api.post<string>(url, {id});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

//Obtener los colaboradores del proyecto
export async function getTeam(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api(url);
        const response = teamMemberSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

//Eliminar colaborador de un proyecto
export async function removeMember({projectId, userId} : {projectId: Project['_id'], userId: Team['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}