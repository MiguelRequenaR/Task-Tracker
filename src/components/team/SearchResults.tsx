import { addMember } from "@/api/TeamApi"
import { Team } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultsProps = {
    user: Team,
    reset: () => void
}

export default function SearchResults({user, reset}: SearchResultsProps) {

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: addMember,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            navigate(location.pathname, { replace: true });
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]});
        }
    })

    const handleAddMember = () => {
        const data = { projectId, id: user._id }
        mutate(data);
    }
    
    return (
        <>
            <p className="">Resultados: </p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-secondary hover:bg-green-100 px-10 py-3 font-bold cursor-pointer transition-colors rounded-lg"
                    onClick={handleAddMember}
                >
                    Agregar al proyecto
                </button>
            </div>
        </>
    )
}
