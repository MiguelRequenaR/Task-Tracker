import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/AuthApi";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
    token: ConfirmToken['token'],
}

export default function NewPasswordForm({token} : NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        passwordConfirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            navigate('/auth/login');
        }
    })


    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data);
    }

    const password = watch('password');

    return (
        <>
            <div className="bg-tertiary p-10 rounded-xl">
                <h1 className="text-4xl font-bold text-primary">Cambiar Contraseña</h1>
                <p className="text-xl font-light text-primary mt-5">
                    Ingrese se nueva {''}
                    <span className=" text-secondary font-bold"> contraseña.</span>
                </p>

                <form
                    onSubmit={handleSubmit(handleNewPassword)}
                    className="space-y-8 p-10  bg-primary mt-10 rounded-lg"
                    noValidate
                >

                    <div className="flex flex-col gap-2">
                        <label
                            className="font-semibold text-xl text-secondary"
                        >Contraseña</label>

                        <input
                            type="password"
                            placeholder="Ingrese su contraseña"
                            className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 8,
                                    message: 'La contraseña debe ser mínima de 8 caracteres'
                                }
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="font-semibold text-xl text-secondary"
                        >Repetir Contraseña</label>

                        <input
                            id="passwordConfirmation"
                            type="password"
                            placeholder="Repita su contraseña"
                            className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                            {...register("passwordConfirmation", {
                                required: "Debe repetir su contraseña",
                                validate: value => value === password || 'Las contraseñas no son iguales'
                            })}
                        />

                        {errors.passwordConfirmation && (
                            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
                        )}
                    </div>

                    <input
                        type="submit"
                        value='Cambiar contraseña'
                        className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-black text-xl cursor-pointer rounded-xl"
                    />
                </form>
            </div>
        </>
    )
}