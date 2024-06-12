import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskApi';
import { toast } from 'react-toastify';
import { formDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/translations';
import { TaskStatus } from '@/types';
import Notes from '../notes/Notes';


export default function TaskModalDetails() {

    //Obtener el proyectoId
    const params = useParams();
    const projectId = params.projectId!;

    const navigate = useNavigate();

    //Obtener la tarea por url
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;

    //Muestra el modal si la tarea existe
    const show = taskId ? true : false;

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        //Solamente si taskId existe realizamos la consulta
        //Los dos simbolos (!!) lo convierte en un booleano
        enabled: !!taskId,
        retry: false
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries();
            queryClient.invalidateQueries({queryKey: ['task', taskId]});
        }
    })

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus;
        const data = {
            projectId,
            taskId,
            status
        }
        mutate(data);
    }

    //Mensaje de error, si hay una tarea que no existe
    if(isError){
        toast.error(error.message, { toastId: 'error'})//Tener un id para el toast hace que no se renderice dos veces
        return <Navigate to={`/projects/${projectId}`} />;
    }
  
    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                                    <p className='text-sm text-primary'>Agregada el: {""}
                                        <span className='text-secondary font-normal'>{formDate(data.createdAt)}</span>
                                    </p>
                                    <p className='text-sm text-primary'>Última actualización: {""}
                                        <span className='text-secondary font-normal'>{formDate(data.updatedAt)}</span>
                                    </p>
                                    
                                    <DialogTitle
                                        as="h3"
                                        className="font-semibold text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </DialogTitle>
                                    <p className='text-md font-light text-primary mb-2'>Descripción: {data.description}.</p>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className='text-xl text-primary mb-2'>Historial de cambios:</p>

                                            <ul className=' list-decimal list-inside'>
                                                {data.completedBy.map ((activityLog) => (
                                                    <li key={activityLog._id}>
                                                        <span className='font-bold text-secondary'>
                                                            {statusTranslations[activityLog.status]} por:</span>{' '} {activityLog.user.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ): null}



                                    <div className='my-5 space-y-3'>
                                        <label className='font-lith text-lg'>Estado Actual:</label>
                                        <select 
                                            className='w-full p-3 bg-white border border-gray-500 rounded-lg '
                                            //Valor por defecto es el estado actual
                                            defaultValue={data.status}
                                            onChange={handleChangeStatus}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <Notes 
                                        notes={data.note}
                                    />
                                    
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}