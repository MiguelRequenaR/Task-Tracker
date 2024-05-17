import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";

export default function ProjectDetails() {

    const navigate = useNavigate();
    const params = useParams();
    const projetcId = params.projectId!;

    //Cuando un funcion recibe parametros esta es la sintaxis a usar con useQuery
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projetcId],
        //cuando se tiene una funcion que toma un parametro se usa callback
        queryFn: () => getProjectById(projetcId),
        retry: false
    })

    //Mensaje que se muestra mientras carga
    if(isLoading) return 'Loading...';
    //Si hay un error se redirige a la pagina 404
    if(isError) return <Navigate to="/404" />;
    //Si hay data se muestra el formulario
    if(data) return (
        <>
            <h1 className="text-5xl font-black">
                {data.projectName}
            </h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex gap-3">
                <button 
                    type="button" 
                    className="bg-indigo-400 hover:bg-indigo-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={() => navigate('?newTask=true')}
                >
                    Add task
                </button>
            </nav>

            <AddTaskModal />
        </>
    )
}
