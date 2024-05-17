import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectApi";
import EditProjectForm from "@/components/projects/EditProjectForm";

export default function EditProject() {
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
    if(data) return <EditProjectForm data={data} projectId={projetcId}/>
}
