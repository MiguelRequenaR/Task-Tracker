import { Navigate, useNavigate, useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/politic";
import { useMemo } from "react";

export default function ProjectDetails() {

    const { data: user, isLoading: authLoading } = useAuth();

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    //Cuando un funcion recibe parametros esta es la sintaxis a usar con useQuery
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        //cuando se tiene una funcion que toma un parametro se usa callback
        queryFn: () => getProjectById(projectId),
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
            <h1 className="text-5xl text-primary font-black">
                {data.projectName}
            </h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button 
                        type="button" 
                        className="bg-cyan-600 hover:bg-cyan-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >
                        Agregar tarea
                    </button>
                    <Link
                        to={'team'}
                        className="bg-secondary hover:bg-green-700 px-10 py-3 text-tertiary text-xl font-bold cursor-pointer transition-colors rounded-xl"
                    >
                        Colaboradores
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
