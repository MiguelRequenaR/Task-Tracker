import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/AuthApi";
import { toast } from "react-toastify";
import bg from '../../../public/bg.jpg'

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: changePassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        }
    })
    
    const handleForgotPassword = (formData: ForgotPasswordForm) => {
        mutate(formData);
    }


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-tertiary">
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-tertiary p-10 rounded-xl w-[70%]">
                        <h1 className="text-3xl font-normal text-primary">Restablecer contraseña</h1>
                        <p className="text-lg font-light text-gray-500 mt-5">Coloca tu e-mail para {''}
                            <span className=" text-secondary font-normal"> restablecer tu contraseña.</span>
                        </p>
                        <form
                            onSubmit={handleSubmit(handleForgotPassword)}
                            className="space-y-8 p-10  bg-primary mt-10 rounded-lg"
                            noValidate
                        >
                            <div className="flex flex-col gap-2">
                            <label
                                className="font-semibold text-xl text-secondary"
                                htmlFor="email"
                            >Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Ingrese su email"
                                className="w-full p-3  border-gray-400 border-2 rounded-xl "
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
                            value='Enviar instrucciones'
                            className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-light  text-xl cursor-pointer rounded-xl"
                            />
                        </form>

                        <nav className="mt-10 flex flex-col space-y-4">
                            <Link
                                to='/auth/login'
                                className="text-center text-primary font-light text-sm"
                            >
                                ¿Ya tienes cuenta? <span className="text-secondary font-normal">Inicia Sesión</span>
                            </Link>

                            <Link
                                to='/auth/register'
                                className="text-center text-primary font-light text-sm"
                            >
                                ¿No tienes cuenta? <span className="text-secondary font-normal">Regístrate</span>
                            </Link>
                        </nav>
                    </div>
                </div>
                <div className="h-screen hidden lg:block">
                    <img src={bg} alt="background" className="w-full h-full object-cover" />
                </div>
            </div>
        </>
    )
}