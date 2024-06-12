import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <label
                    className="font-light text-lg"
                    htmlFor="name"
                >Nombre de la tarea</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    className="ww-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                    {...register("name", {
                        required: "El nombre es obligatorio"
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-light text-lg"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción"
                    className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                    {...register("description", {
                        required: "La descripción es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}