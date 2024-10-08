import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from '@/components/ErrorMessage';
import { CheckPasswordForm } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkPassword } from '@/api/AuthApi';
import { toast } from 'react-toastify';
import { deleteProject } from '@/api/ProjectApi';

export default function DeleteProject() {
    const initialValues : CheckPasswordForm = {
        password: ''
    }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient();
    const checkUserPassword = useMutation({
        mutationFn: checkPassword,
        onError: (error) => {
            toast.error(error.message)
        },
    })

    //useMutation modifica los datos
    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data),
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            navigate(location.pathname, { replace: true });
        }
    })

    const handleForm = async (formData : CheckPasswordForm) => {
        //usamos el mutateasync para prevenir que se ejecute el siguiente codigo
        await checkUserPassword.mutateAsync(formData);
        await deleteProjectMutation.mutateAsync(deleteProjectId);
    }


    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">

                                <DialogTitle
                                    as="h3"
                                    className="font-semibold text-4xl text-primary my-5"
                                >Eliminar Proyecto </DialogTitle>

                                <p className="text-xl font-light text-gray-500 mt-5">Confirma la eliminación del proyecto {''}
                                    <span className="text-secondary">colocando tu password.</span>
                                </p>

                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >

                                    <div className="flex flex-col gap-3">
                                        <label
                                            className="text-lg font-light"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password Inicio de Sesión"
                                            className="w-full p-3  border-gray-400 border-2 rounded-xl focus:outline-none"
                                            {...register("password", {
                                                required: "El password es obligatorio",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className=" bg-secondary hover:bg-green-600 w-full p-3  text-white font-light text-xl cursor-pointer rounded-xl"
                                        value='Eliminar Proyecto'
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}