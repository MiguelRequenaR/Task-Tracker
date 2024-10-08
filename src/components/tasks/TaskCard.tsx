import { TaskProject } from "@/types"
import { Fragment } from "react/jsx-runtime"
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/api/TaskApi"
import { toast } from "react-toastify"
import { useDraggable } from "@dnd-kit/core"
import { statusTranslations } from "@/locales/translations"

type TaskCardProps = {
    task: TaskProject
    canEdit: boolean,
}


export default function TaskCard({task, canEdit}: TaskCardProps) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
    })
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries();
            toast.success(data);
        }
    })
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    }: undefined;
        
    const statusStyles : { [key: string] : string } = {
        pending: 'bg-cyan-200',
        onHold: 'bg-red-200',
        inProgress: 'bg-indigo-200',
        underReview: 'bg-amber-200',
        completed: 'bg-green-200',
    }
    return (
        <li 
            className="flex justify-between p-5 bg-white gap-3 rounded-xl"
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            style={style}
        >
            <div 
                
                className="min-w-0 flex flex-col gap-y-4"
            >                   
                <h1
                    className={`${statusStyles[task.status]} text-ms text-center rounded-xl font-normal w-[55%] text-primary`}
                >{statusTranslations[task.status]}</h1>

                <button
                    type="button"
                    className="text-xl font-light text-primary text-left"
                    onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                >
                    {task.name}
                </button>
                <p className="text-gray-500">{task.description}</p>
            </div>
            <div className="flex shrink-0  gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                    </MenuButton>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <MenuItems
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none font-light">
                            <MenuItem>
                                <button 
                                    type='button' 
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                    onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                                >
                                    Detalles de tarea
                                </button>
                            </MenuItem>
                            {canEdit && (
                                <>
                                    <MenuItem>
                                        <button 
                                            type='button' 
                                            className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                            onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                                        >
                                            Editar tarea
                                        </button>
                                    </MenuItem>

                                    <MenuItem>
                                        <button 
                                            type='button' 
                                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                                            //Agregamos la funcion mutate a la tarea, para que se elimine
                                            onClick={() => mutate({projectId, taskId: task._id})}
                                        >
                                            Eliminar tarea
                                        </button>
                                    </MenuItem>
                                </>
                            )}
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
        </li>
    )
}
