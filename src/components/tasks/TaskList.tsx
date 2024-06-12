import { TaskStatus, TaskProject } from "@/types"
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/translations";
import DropTask from "./DropTask";
import { 
    DndContext, 
    DragEndEvent, 
    MouseSensor, 
    TouchSensor, 
    useSensor, 
    useSensors 
} from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


type TaskListProps = {
    tasks: TaskProject[],
    canEdit: boolean,
}

type StatusGroups = {
    [key: string]: TaskProject[],
}

const initialStatusGroups : StatusGroups = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}


const statusStyles : { [key: string] : string } = {
    pending: 'bg-cyan-200',
    onHold: 'bg-red-200',
    inProgress: 'bg-indigo-200',
    underReview: 'bg-amber-200',
    completed: 'bg-green-200',
}



export default function TaskList({tasks, canEdit}: TaskListProps) {

    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries();
        }
    })

    //Agrupar las tareas por el estado con reduce
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        }
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        }
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e;
        if(over && over.id){
            const taskId = active.id.toString();
            const status = over.id as TaskStatus;

            mutate({projectId, taskId, status});
        }
    }


    return (
        <>
            <h2 className="text-3xl text-primary font-light my-10">Tareas Disponibles</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext
                    sensors={sensors}
                    onDragEnd={(handleDragEnd)}
                >
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3 
                                className={`capitalize text-xl font-light text-gray-700 text-center bg-white p-3  rounded-xl ${statusStyles[status]}`}
                            >
                                {statusTranslations[status]}
                            </h3>

                            <DropTask 
                                status={status}
                            />

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center font-normal pt-3">No hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    )
}
