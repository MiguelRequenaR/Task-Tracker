import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/AuthApi";
import { toast } from "react-toastify";

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
            <div className="bg-tertiary p-10 rounded-xl">
                <h1 className="text-4xl font-bold text-primary">Restablecer contraseña</h1>
                <p className="text-xl font-light text-primary mt-5">
                    Coloca tu e-mail para {''}
                    <span className=" text-secondary font-bold"> restablecer tu contraseña.</span>
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
                        className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
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
                    value='Enviar Instrucciones'
                    className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-xl"
                    />
                </form>

                <nav className="mt-10 flex flex-col space-y-4">
                    <Link
                        to='/auth/login'
                        className="text-center text-primary font-normal text-sm"
                    >
                        ¿Ya tienes cuenta? <span className="text-secondary font-bold">Inicia Sesión</span>
                    </Link>

                    <Link
                        to='/auth/register'
                        className="text-center text-primary font-normal text-sm"
                    >
                        ¿No tienes cuenta? <span className="text-secondary font-bold">Regístrate</span>
                    </Link>
                </nav>
            </div>
        </>
    )
}