import { Task } from "@/types";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesProps = {
    notes: Task['note'],
}

export default function Notes({notes}: NotesProps) {
    return (
        <>
            <AddNoteForm />
            <div className="divide-y divide-gray-100 mt-10">
                {notes.length ? (
                    <>
                        <p className="font-bold text-2xl text-secondary my-5">Notas: </p>
                        {notes.map(note => <NoteDetail key={note._id} note={note} />)}
                    </>
                ): <p className="text-secondary text-center">No hay notas</p>}
            </div>
        </>
    )
}
