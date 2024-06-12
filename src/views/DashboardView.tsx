import { Fragment } from 'react'
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/api/ProjectApi"
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/politic'
import DeleteProject from './projects/DeleteProject'
import { PlusIcon } from '@heroicons/react/16/solid'


export default function DashboardView() {

  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading: authLoading } = useAuth();

  //useQuery obtiene los datos de la API
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects 
  })


  if(isLoading && authLoading) return 'Cargando...';

  if(data && user) return (
    <>
      <div className='lg:flex items-center justify-between'>
        <div className='p-3'>
          <h1 className="text-5xl text-primary font-semibold">Proyectos</h1>
          <p className="text-2xl font-light mt-3 text-gray-500">Administra tus proyectos</p>
        </div>
        <nav className="my-5 flex bg-secondary hover:bg-green-600 px-5 py-3 text-white text-xl font-light cursor-pointer transition-colors items-center gap-3 rounded-xl">
          <PlusIcon className='h-5 w-5' />
          <Link 
            to="/projects/create"
          >
            Nuevo proyecto
          </Link>
        </nav>
      </div>
      
      {data.length ? (
      <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 rounded-xl shadow-2xl">
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
                                              onClick={() => navigate (location.pathname + `?deleteProject=${project._id}`)}
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
        <p className="text-center font-light text-xl py-20">Aún no hay proyectos, {''}
          <Link 
            className="text-secondary"
            to="/projects/create"
          >
            empieza por crear un nuevo proyecto.
          </Link>
        </p>
      )}

      <DeleteProject />

    </>
  )
}
