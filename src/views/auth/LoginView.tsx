import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
        }
    })

    const handleLogin = (formData: UserLoginForm) => { 
        mutate(formData);
     }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-6 p-10 bg-tertiary rounded-xl"
                noValidate
            >
                <div>
                    <h1 className="text-4xl font-bold text-primary">Inicia Sesión </h1>
                    <div className="mt-10 flex items-centerd justify-around gap-7">
                        <div className="flex gap-5 items-center border border-primary w-1/2 py-2 px-2 rounded-xl group hover:border-secondary cursor-pointer">
                            <img 
                                src="https://img.icons8.com/?size=48&id=17949&format=png" 
                                alt="logo" 
                                className="w-10 h-10"
                            />
                            <p className="text-primary font-bold text-xl group-hover:text-secondary">Google</p>
                        </div>
                        <div className="flex gap-5 items-center border border-primary w-1/2 py-2 px-2 rounded-xl group hover:border-secondary cursor-pointer">
                            <img 
                                src="https://img.icons8.com/?size=48&id=118497&format=png" 
                                alt="logo" 
                                className="w-10 h-10"
                            />
                            <p className="text-primary font-bold text-xl group-hover:text-secondary">Facebook</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="mx-2 text-sm text-gray-500">Or</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-semibold text-xl"
                    >Email:</label>

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

                <div className="flex flex-col gap-2">
                <label
                    className="font-semibold text-xl"
                >Contraseña</label>

                <input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none focus:border-secondary"
                    {...register("password", {
                        required: "El Password es obligatorio",
                    })}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-black text-xl cursor-pointer rounded-xl"
                />
                <div className="flex items-center justify-between">
                    <Link
                        to='/auth/forgot-password'
                        className="text-center text-primary font-normal text-sm"
                    >
                        Restablecer <span className="text-secondary text-sm font-bold">Contraseña</span>
                    </Link>
                    <Link
                        to={'/auth/register'}
                    >
                        <p className="text-sm">¿No tienes una cuenta? <span className="text-secondary text-sm font-bold">Regístrate</span></p>
                    </Link>
                </div>
            </form>
        </>
    )
}