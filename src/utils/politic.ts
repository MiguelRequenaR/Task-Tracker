import { Project, Team } from "@/types"


export const isManager = (managerId: Project['manager'], userId: Team['_id']) => {
    return managerId === userId;
}