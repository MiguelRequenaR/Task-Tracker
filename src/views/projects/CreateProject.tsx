import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectApi"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"

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
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold">Crear proyecto</h1>
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
                    className="mt-10 bg-white shadow-xl p-10 rounded-xl"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm 
                        register={register}
                        errors={errors}
                    />
                    <input 
                        type="submit" 
                        value="Crear proyecto" 
                        className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-light text-xl cursor-pointer rounded-xl"
                    />
                </form>
            </div>
        </>
    )
}
