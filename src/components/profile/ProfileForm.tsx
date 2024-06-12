import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserFormData } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileApi"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User,
}

export default function ProfileForm({ data } : ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({ defaultValues: data })

    const queryCliente = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            queryCliente.invalidateQueries({queryKey: ['user']});
        }
    })

    const handleEditProfile = (formData : UserFormData) => mutate(formData);

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-4xl font-semibold ">Mi Perfil</h1>
                <p className="text-xl font-light text-gray-500 mt-5">Aquí puedes actualizar {""}
                    <span className="text-secondary font-normal">tu información.</span>
                </p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-2xl p-10 rounded-xl"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-lg font-light"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border-2 rounded-xl focus:outline-none focus:border-secondary"
                            {...register("name", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-lg font-light"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3 border-2 rounded-xl focus:outline-none focus:border-secondary"
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
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
                        value='Guardar Cambios'
                        className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-light text-xl cursor-pointer rounded-xl"
                    />
                </form>
            </div>
        </>
    )
}