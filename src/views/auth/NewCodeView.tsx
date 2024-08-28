import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData);
    }

    return (
        <>
            <div className="bg-tertiary p-10 rounded-xl">
                <h1 className="text-3xl font-normal text-primary">Solicitar Código de Confirmación</h1>
                <p className="text-lg font-light text-gray-500 mt-5">
                    Coloca tu e-mail para recibir {''}
                    <span className=" text-secondary font-normal"> un nuevo código.</span>
                </p>

                <form
                    onSubmit={handleSubmit(handleRequestCode)}
                    className="space-y-8 p-10 rounded-lg bg-primary mt-10"
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
                        value='Enviar Código'
                        className="bg-secondary hover:bg-green-600 w-full p-3  text-white font-black text-xl cursor-pointer rounded-xl"
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
                        to='/auth/forgot-password'
                        className="text-center text-primary font-normal text-sm"
                    >
                        ¿Olvidaste tu contraseña? <span className="text-secondary font-bold">Restablecer Contraseña</span>
                    </Link>
                </nav>
            </div> 
        </>
    )
}