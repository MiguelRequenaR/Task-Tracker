import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "@/types";
import { isAxiosError } from "axios";

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    status: Task['status'],
}

//Crear una tarea
export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'>) {
    try{
        const url = `/projects/${projectId}/tasks`;
        const { data } = await api.post<string>(url, formData)
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

//Obtener una tarea por id
export async function getTaskById({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data} = await api(url);
        // const { data } = await api.get<TaskAPI>(url)
        const response = taskSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

//Actualizar una tarea
export async function updateTask({formData, projectId, taskId} : Pick<TaskAPI, 'formData' | 'projectId' | 'taskId'>) {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put<string>(url, formData)
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

//Eliminar una tarea
export async function deleteTask({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete<string>(url)
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

//Obtener el estado actual de una tarea
//Status se pasa como un objeto porque mutation solo recibe un parametro y como se varios se pasa como un objeto
export async function updateStatus({projectId, taskId, status}: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}/status`;
        const { data } = await api.post<string>(url, {status});
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}