import { Navigate, useNavigate, useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getFullProject } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/politic";
import { useMemo } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

export default function ProjectDetails() {

    const { data: user, isLoading: authLoading } = useAuth();

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    //Cuando un funcion recibe parametros esta es la sintaxis a usar con useQuery
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        //cuando se tiene una funcion que toma un parametro se usa callback
        queryFn: () => getFullProject(projectId),
        retry: false
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

    //Mensaje que se muestra mientras carga
    if(isLoading && authLoading) return 'Loading...';
    //Si hay un error se redirige a la pagina 404
    if(isError) return <Navigate to="/404" />;
    //Si hay data se muestra el formulario
    if(data && user) return (
        <>
            <h1 className="text-4xl text-primary font-semibold">
                {data.projectName}
            </h1>
            <p className="text-xl font-light text-gray-500 mt-5">{data.description}</p>

            {isManager(data.manager, user._id) && (
                <nav className="my-5 lg:flex gap-3">
                    <button 
                        type="button" 
                        className="bg-secondary hover:bg-green-700 px-5 py-3 text-tertiary text-xl font-light cursor-pointer transition-colors rounded-xl flex items-center gap-3 mb-2"
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >
                        <PlusCircleIcon className="h-5 w-5" />
                        Agregar tarea
                    </button>
                    <Link
                        to={'team'}
                        className="bg-secondary hover:bg-green-700 px-5 py-3 text-tertiary text-xl font-light cursor-pointer transition-colors rounded-xl flex items-center gap-3 mb-2"
                    >
                        <PlusCircleIcon className="h-5 w-5" />
                        Agregar miembro
                    </Link>
                </nav>
            )}


            <TaskList 
                //Pasamos las tareas del proyecto al componente TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />

            <AddTaskModal />
            {/* Este realiza la consulta con usequery, y trae la info de la tarea a editar */}
            <EditTaskData />
            
            <TaskModalDetails />
        </>
    )
}
