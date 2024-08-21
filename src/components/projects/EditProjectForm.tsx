import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
}

export default function EditProjectForm({ data, projectId } : EditProjectFormProps) {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description,
    }})

    const queryCliente = useQueryClient();

    const { mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            //Invalidamos la cache para que se vuelva a hacer la peticion y se actualice la lista de proyectos
            queryCliente.invalidateQueries({queryKey: ['projects']});
            queryCliente.invalidateQueries({queryKey: ['editProject', projectId]});
            toast.success(data);
            navigate('/');
        },
    })

    const handleForm = (formData: ProjectFormData) => {
        //Las mutaciones solo toman una variable, si se requiere pasar multiples, se las puede pasar en un objeto
        const data = {
            formData,
            projectId
        }
        mutate(data);
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold text-primary">Editar proyecto</h1>
                        <p className="text-xl font-light text-gray-500 mt-5">Completa el formulario</p>
                    </div>
                    <nav className="my-5 flex bg-secondary hover:bg-green-600 px-5 py-3 text-white text-xl font-light cursor-pointer transition-colors items-center gap-3 rounded-xl">
                        <ArrowUturnLeftIcon className="h-5 w-5" />
                        <Link 
                        to="/"
                        >
                            Volver a proyectos
                        </Link>
                    </nav>
                </div>
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm 
                        register={register}
                        errors={errors}
                    />
                    <input 
                        type="submit" 
                        value="Guardar cambios" 
                        className="bg-secondary hover:bg-green-600 w-full p-3 text-white font-light text-xl cursor-pointer rounded-xl"
                    />
                </form>
            </div>
        </>
    )
}
