import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/TaskApi";
import EditTaskModal from "./EditTaskModal";

//Este componente se encarga de renderizar edittaskmodal
export default function EditTaskData() {

    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('editTask')!;

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({
            projectId,
            taskId
        }),
        //Convierte el valor en un boleano si el taskId existe
        enabled: !!taskId,
    })

    if(isError) return <Navigate to="/404" />;

    if(data) return <EditTaskModal data={data} taskId={taskId}/>
}
