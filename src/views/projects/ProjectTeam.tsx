import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeam, removeMember } from "@/api/TeamApi";
import { Fragment } from "react";
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";


export default function ProjectTeam() {

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getTeam(projectId),
        retry: false
    })

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: removeMember,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]});
        }
    })

    if(isLoading) return 'Cargando...';
    if(isError) return <Navigate to="/404" />;

    if(data) return (
        <>
            <h1 className="text-4xl text-primary font-semibold">
                Miembros del proyecto
            </h1>
            <p className="text-xl font-light text-gray-500 mt-5">Administra los colaboradores de tu proyecto.</p>

            <nav className="my-5 lg:flex gap-3">
                <button 
                    type="button" 
                    className="bg-secondary hover:bg-green-700 px-5 py-3 text-tertiary text-xl font-light cursor-pointer transition-colors rounded-xl flex items-center gap-3 mb-2"
                    onClick={() => navigate(location.pathname + '?addMember=true')}
                >
                    <PlusCircleIcon className="h-5 w-5" />
                    Agregar miembro
                </button>
                <Link
                    to={`/projects/${projectId}`}
                    className="bg-secondary hover:bg-green-700 px-5 py-3 text-tertiary text-xl font-light cursor-pointer transition-colors rounded-xl flex items-center gap-3 mb-2"
                >
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                    Volver a tareas
                </Link>
            </nav>

            <h2 className="text-4xl font-semibold text-primary my-10">Miembros actuales</h2>
            {data.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 rounded-xl bg-white shadow-lg">
                    {data?.map((member) => (
                        <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-bold text-gray-600">
                                        {member.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </MenuButton>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <MenuItem>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={() => mutate({projectId, userId: member._id})}
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center font-light text-lg py-20'>No hay miembros en este equipo {""}
                    <span className="text-secondary font-normal">empieza por agregar uno.</span>
                </p>
            )}

            <AddMemberModal />
        </> 
    )
}
