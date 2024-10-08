import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types";
import { findUser } from "@/api/TeamApi";
import SearchResults from "./SearchResults";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUser,
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {projectId, formData}
        mutation.mutate(data);
    }

    const resetData = () => {
        reset();
        mutation.reset();
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-2">
                    <label
                        className="font-light text-xl"
                        htmlFor="name"
                    >E-mail de usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-400 border-2 rounded-xl"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className=" bg-secondary hover:bg-green-600 w-full p-3  text-white font-light text-xl cursor-pointer rounded-xl"
                    value='Buscar miembro'
                />
            </form>
            <div className="text-center font-semibold mt-10">
                {mutation.isPending && <p className="text-center text-secondary">Buscando...</p>}
                {mutation.error && <p className="text-center text-red-700">{mutation.error.message}</p>}
                {mutation.data && <SearchResults user={mutation.data} reset={resetData} />}
            </div>
        </>
    )
}