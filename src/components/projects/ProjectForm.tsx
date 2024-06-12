import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "@/types";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ errors, register }: ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-lg font-light">
                    Nombre
                </label>
                <input
                    id="projectName"
                    className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                    placeholder="Nombre"
                    {...register("projectName", {
                        required: "El Nombre del Proyecto es obligatorio",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-lg  font-light">
                    Nombre del cliente
                </label>
                <input
                    id="clientName"
                    className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                    placeholder="Cliente"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-lg  font-light">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                    placeholder="Descripción"
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}