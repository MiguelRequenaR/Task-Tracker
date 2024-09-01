import { useForm } from "react-hook-form";
import { UserRegisterForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "@/api/AuthApi";
import { toast } from "react-toastify";
import bg from '../../../public/bg.jpg'

export default function RegisterView() {
    const initialValues: UserRegisterForm = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegisterForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: registerAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        }
    })

    //Se le pasa el campo para su revisión
    const password = watch('password');

    const handleRegister = (formData: UserRegisterForm) => {
        mutate(formData);
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-tertiary">
                <div className="h-screen hidden lg:block">
                    <img src={bg} alt="background" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        className="space-y-6 p-10 rounded-xl w-[90%]"
                        noValidate
                    >
                        <div>
                            <h1 className="text-3xl font-normal text-primary">Regístrate </h1>	
                            {/* <div className="mt-10 flex items-centerd justify-around gap-7">
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
                            </div> */}
                        </div>
                        {/* Separador */}
                        {/* <div className="flex items-center justify-center">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="mx-2 text-sm text-gray-500">Or</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div> */}
                        <div className="flex flex-col gap-2">
                        <label
                            className="font-light text-lg"
                            htmlFor="email"
                        >Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingrese su email"
                            className="w-full p-3  border-gray-400 border-2 rounded-xl"
                            {...register("email", {
                            required: "El Email de registro es obligatorio",
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
                            className="font-light text-lg"
                        >Nombre</label>
                        <input
                            type="name"
                            placeholder="Ingrese su nombre"
                            className="w-full p-3  border-gray-400 border-2 rounded-xl"
                            {...register("name", {
                            required: "El Nombre de usuario es obligatorio",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                        </div>

                        <div className="flex flex-col gap-2">
                        <label
                            className="font-light text-lg"
                        >Contraseña</label>

                        <input
                            type="password"
                            placeholder="Ingrese su contraseña"
                            className="w-full p-3  border-gray-400 border-2 rounded-xl "
                            {...register("password", {
                            required: "El Password es obligatorio",
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

                        <div className="flex flex-col gap-2">
                        <label
                            className="font-light text-lg"
                        >Repita su contraseña</label>

                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="Repita su contraseña"
                            className="w-full p-3  border-gray-400 border-2 rounded-xl "
                            {...register("passwordConfirmation", {
                            required: "Repetir Password es obligatorio",
                                validate: value => value === password || 'Los Passwords no son iguales'
                            })}
                        />

                        {errors.passwordConfirmation && (
                            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
                        )}
                        </div>

                        <input
                            type="submit"
                            value='Registrarme'
                            className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-light text-xl cursor-pointer rounded-xl"
                        />
                        <div className="flex items-center justify-between">
                            <Link
                                to={'/auth/forgot-password'}
                            >
                                <p className="text-sm font-light">Restablecer <span className="text-secondary text-sm font-light">Contraseña</span></p>
                            </Link>
                            <Link
                                to={'/auth/login'}
                            >
                                <p className="text-sm font-light">¿Ya tienes una cuenta? <span className="text-secondary text-sm font-light">Iniciar Sesión</span></p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}