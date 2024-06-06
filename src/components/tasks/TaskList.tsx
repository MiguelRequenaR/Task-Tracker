import { Task } from "@/types"
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/translations";


type TaskListProps = {
    tasks: Task[],
    canEdit: boolean,
}

type StatusGroups = {
    [key: string]: Task[],
}

const initialStatusGroups : StatusGroups = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}


const statusStyles : { [key: string] : string } = {
    pending: 'border-t-cyan-700',
    onHold: 'border-t-red-600',
    inProgress: 'border-t-indigo-600',
    underReview: 'border-t-amber-600',
    completed: 'border-t-green-600',
}



export default function TaskList({tasks, canEdit}: TaskListProps) {

    //Agrupar las tareas por el estado con reduce
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);


    return (
        <>
            <h2 className="text-5xl font-black text-primary my-10">Tareas Disponibles</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 
                            className={`capitalize text-xl font-semibold text-gray-700 text-center border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
                        >
                            {statusTranslations[status]}
                        </h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center font-semibold pt-3">No hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
