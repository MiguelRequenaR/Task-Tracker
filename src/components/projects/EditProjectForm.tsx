import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

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
                <h1 className="text-5xl font-black">Edit Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Complet the Form</p>
                <nav className="my-5">
                    <Link 
                    className="bg-indigo-400 hover:bg-indigo-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    to="/"
                    >
                        Back to Dashboard
                    </Link>
                </nav>
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
                        value="Save Changes" 
                        className="bg-cyan-600 hover:bg-cyan-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
