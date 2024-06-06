import { z } from 'zod';

//Auth Users
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    passwordConfirmation: z.string(),
    token: z.string(),
})

type AuthUser = z.infer<typeof authSchema>
export type UserLoginForm = Pick<AuthUser, 'email' | 'password'>
export type UserRegisterForm = Pick<AuthUser, 'name' | 'email' | 'password' | 'passwordConfirmation'>
export type RequestConfirmationCodeForm = Pick<AuthUser, 'email'>
export type ForgotPasswordForm = Pick<AuthUser, 'email'>
export type NewPasswordForm = Pick<AuthUser, 'password' | 'passwordConfirmation'>
export type ConfirmToken = Pick<AuthUser, 'token'>

//Users
export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string(),
})

export type User = z.infer<typeof userSchema>;

//Tasks
export const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

//Projects

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})

export const dashboardProject = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
    })
)
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

//Team
const teamSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true,
})

export const teamMemberSchema = z.array(teamSchema);
export type Team = z.infer<typeof teamSchema>;
export type TeamMemberForm = Pick<Team, 'email'>