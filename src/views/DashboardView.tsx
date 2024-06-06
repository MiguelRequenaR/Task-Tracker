import { Fragment } from 'react'
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProject, getProjects } from "@/api/ProjectApi"
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/politic'


export default function DashboardView() {

  const { data: user, isLoading: authLoading } = useAuth();

  //useQuery obtiene los datos de la API
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects 
  })

  //useQueryClient invalida la cache
  const queryClient = useQueryClient();

  //useMutation modifica los datos
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data),
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })


  if(isLoading && authLoading) return 'Cargando...';

  if(data && user) return (
    <>
      <h1 className="text-5xl text-primary font-black">Proyectos</h1>
      <p className="text-2xl pb-4 font-light text-gray-500 mt-5">Administra tus proyectos</p>
      <nav className="my-5">
        <Link 
          className="bg-cyan-600 hover:bg-cyan-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to="/projects/create"
        >
          Crear proyecto
        </Link>
      </nav>
      
      {data.length ? (
      <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
        {data.map((project) => (
          <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
              <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <div className="mb-2">
                      {
                        isManager(project.manager, user._id) ? 
                        <p className='font-black text-xs uppercase bg-green-100 border-2 border-secondary text-secondary  rounded-lg inline-block py-1 px-5'>Administrador del proyecto</p> :
                        <p className='font-black text-xs uppercase bg-indigo-100 border-2 border-indigo-400 text-indigo-400  rounded-lg inline-block py-1 px-5'>Miembro del proyecto</p>
                      }
                    </div>
                      <Link to={`/projects/${project._id}`}
                          className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                      >{project.projectName}</Link>
                      <p className="text-sm text-gray-400">
                          Cliente: {project.clientName}
                      </p>
                      <p className="text-sm text-gray-400">
                          {project.description}
                      </p>
                  </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                          <span className="sr-only">opciones</span>
                          <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                      </MenuButton>
                      <Transition as={Fragment} enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95">
                          <MenuItems
                              className="absolute right-0 z-10 mt-2 w-56 origin-top-right font-bold rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                          >
                                  <MenuItem>
                                      <Link to={`/projects/${project._id}`}
                                          className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                      Ver Proyecto
                                      </Link>
                                  </MenuItem>

                                  {/* Verificar si el usuario es el manager del proyecto */}
                                  {isManager(project.manager, user._id) && (
                                    <>
                                      <MenuItem>
                                          <Link to={`/projects/${project._id}/edit`}
                                              className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                          Editar Proyecto
                                          </Link>
                                      </MenuItem>
                                      <MenuItem>
                                          <button 
                                              type='button' 
                                              className='block px-3 py-1 text-sm leading-6 text-red-500'
                                              onClick={() => mutate( project._id ) }
                                          >
                                              Eliminar Proyecto
                                          </button>
                                      </MenuItem>
                                    </>
                                  )}
                          </MenuItems>
                      </Transition>
                  </Menu>
              </div>
          </li>
        ))}
      </ul>
      ) : (
        <p className="text-center text-xl py-20">Aún no hay proyectos, {''}
        <Link 
          className="text-cyan-600 font-bold"
          to="/projects/create"
        >
          Empieza por crear un nuevo proyecto
        </Link>
        </p>
      )}
    </>
  )
}
