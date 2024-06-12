import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { ChangePasswordForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePasswordUser } from "@/api/ProfileApi";

export default function ChangePasswordView() {
    const initialValues : ChangePasswordForm = {
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: changePasswordUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
        }
    })

    const password = watch('password');

    const handleChangePassword = (formData: ChangePasswordForm) => { 
        mutate(formData);
    }

    return (
        <>
        <div className="mx-auto max-w-3xl">

            <h1 className="text-3xl font-semibold ">Cambiar contraseña</h1>
            <p className="text-xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar {""}
                <span className="text-secondary font-normal">tu contraseña.</span>
            </p>

            <form
            onSubmit={handleSubmit(handleChangePassword)}
            className=" mt-14 space-y-5 bg-white shadow-2xl p-10 rounded-xl"
            noValidate
            >
            <div className="mb-5 space-y-3">
                <label
                className="text-lg font-light"
                htmlFor="current_password"
                >Contraseña actual</label>
                <input
                id="current_password"
                type="password"
                placeholder="Contraseña actual"
                className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                {...register("currentPassword", {
                    required: "La Contraseña actual es obligatorio",
                })}
                />
                {errors.currentPassword && (
                <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label
                className="text-lg font-light"
                htmlFor="password"
                >Contraseña nueva</label>
                <input
                id="password"
                type="password"
                placeholder="Contraseña nueva"
                className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                {...register("password", {
                    required: "La Contraseña nueva es obligatorio",
                    minLength: {
                    value: 8,
                    message: 'El Password debe ser mínimo de 8 caracteres'
                    }
                })}
                />
                {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label
                htmlFor="password_confirmation"
                className="text-lg font-light"
                >Repita la contraseña</label>

                <input
                id="password_confirmation"
                type="password"
                placeholder="Repita la contraseña"
                className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                {...register("passwordConfirmation", {
                    required: "Este campo es obligatorio",
                    validate: value => value === password || 'Los Passwords no son iguales'
                })}
                />
                {errors.passwordConfirmation && (
                <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
                )}
            </div>

            <input
                type="submit"
                value='Cambiar Password'
                className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-light text-xl cursor-pointer rounded-xl"
            />
            </form>
        </div>
        </>
    )
}