import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string,
}

export default function DropTask({status}: DropTaskProps) {

    const { isOver ,setNodeRef } = useDroppable({
        id: status,
    })

    const style = {
        opacity: isOver ? 0.5 : undefined,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="text-xs font-semibold p-2 border border-dashed border-slate-500 mt-5 grid cursor-pointer place-content-center text-slate-600"
        >
            Soltar tarea aquí
        </div>
    )
}
