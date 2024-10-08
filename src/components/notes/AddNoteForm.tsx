import { NoteFormData } from "@/types"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;

    const initialValues : NoteFormData = {
        content: "",
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['task', taskId]});
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData});
        reset();
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-3">
                <label 
                    htmlFor="content"
                    className="font-light text-lg"
                >
                    Crear Nota
                </label>
                <input 
                    type="text" 
                    id="content" 
                    placeholder="Nota"
                    className="w-full p-3  border-gray-400 border-2 rounded-xl"
                    {...register("content", {
                        required: "El contenido de la nota es obligatorio"
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input type="submit" value="Crear Nota" className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-light text-xl cursor-pointer rounded-xl"/>
        </form>
    )
}
