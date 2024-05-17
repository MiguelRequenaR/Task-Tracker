import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectApi"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"


export default function CreateProject() {

    const navigate = useNavigate();
    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: "",
    }
    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate("/");
        }
    });

    //esta es la funcion que envia las variables hacia la funcion definida en mutationFn
    const handleForm = (formData : ProjectFormData) => mutate(formData);

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Create/Register Project</h1>
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
                        value="Create Project" 
                        className="bg-cyan-600 hover:bg-cyan-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
