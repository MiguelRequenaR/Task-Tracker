import { Link } from "react-router-dom";
import { useState } from "react";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { ConfirmToken } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { confirmAccount } from "@/api/AuthApi";

export default function ConfirmAccountView() {

    const [token, setToken ] = useState<ConfirmToken['token']>("");

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
        }
    });

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token);
    };

    const handleComplete = (token: ConfirmToken['token']) => {
        mutate({token});
    };

    return (
        <>     
            <div className="bg-tertiary p-10 rounded-xl">
                <h1 className="text-3xl font-normal text-primary">Confirma tu Cuenta</h1>
                <p className="text-lg font-light text-primary mt-5">
                    Ingresa el código que recibiste {''}
                    <span className=" text-secondary font-bold"> por e-mail.</span>
                </p>
                <form
                    className="space-y-8 p-10 bg-primary mt-10 rounded-xl"
                >
                    <label
                    className="font-normal text-lg text-center block text-secondary"
                    >Código de 6 dígitos</label>
                    <div className="flex justify-center gap-5">
                        <PinInput
                            value={token}
                            onChange={handleChange}
                            onComplete={handleComplete}
                        >
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg border-2 placeholder-tertiary"
                            />
                        </PinInput>
                    </div>

                </form>

                <nav className="mt-10 flex flex-col space-y-4">
                    <Link
                        to='/auth/request-confirmation-code'
                        className="text-center text-secondary font-semibold text-lg"
                    >
                        Solicitar un nuevo Código
                    </Link>
                </nav>
            </div>
        </>
    )
}