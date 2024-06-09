import { z } from 'zod';

//Auth Users
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    currentPassword: z.string(),
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
export type ChangePasswordForm = Pick<AuthUser, 'currentPassword' | 'password' | 'passwordConfirmation'>
export type ConfirmToken = Pick<AuthUser, 'token'>

//Users
export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string(),
})

export type User = z.infer<typeof userSchema>;
export type UserFormData = Pick<User, 'name' | 'email'>

//Notes
export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string(),
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

//Tasks
export const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    note: z.array(noteSchema.extend({
        createdBy: userSchema,
    })),
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
    manager: z.string(userSchema.pick({_id: true})),
})

export const dashboardProject = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true,
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