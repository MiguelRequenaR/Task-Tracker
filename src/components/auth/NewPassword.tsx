import { validateToken } from '@/api/AuthApi';
import { ConfirmToken } from '@/types';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type NewPasswordProps = {
    token: ConfirmToken['token'],
    setToken: React.Dispatch<React.SetStateAction<ConfirmToken['token']>>,
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPassword({token, setToken, setIsValid}: NewPasswordProps) {

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            setIsValid(true);
        }
    })

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token);
    }
    const handleComplete = (token: ConfirmToken['token']) => {
        mutate({token});
    }

    return (
        <>
            <div className='bg-tertiary p-10 rounded-xl'>  
                <h1 className="text-4xl font-bold text-primary">Restablece tu contraseña</h1>
                <p className="text-xl font-light text-primary mt-5">
                    Ingresa el código que recibiste {''}
                    <span className=" text-secondary font-bold"> por e-mail.</span>
                </p>   
                <form
                    className="space-y-8 p-10 bg-primary mt-10 rounded-xl"
                >
                    <label
                        className="font-normal text-2xl text-center block text-secondary"
                    >Código de 6 dígitos</label>
                    <div className="flex justify-center gap-5">
                        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg focus:outline-none focus:border-secondary border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg focus:outline-none focus:border-secondary border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg focus:outline-none focus:border-secondary border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg focus:outline-none focus:border-secondary border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg focus:outline-none focus:border-secondary border-2 placeholder-tertiary"
                            />
                            <PinInputField 
                                className="w-10 h-10 p-3 rounded-lg focus:outline-none focus:border-secondary border-2 placeholder-tertiary"
                            />
                        </PinInput>
                    </div>
                </form>
                <nav className="mt-10 flex flex-col space-y-4">
                    <Link
                        to='/auth/forgot-password'
                        className="text-center text-secondary font-semibold text-lg"
                    >
                        Solicitar un nuevo Código
                    </Link>
                </nav>
            </div>
        </>
    )
}