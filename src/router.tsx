import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProject from "./views/projects/CreateProject";
import EditProject from "./views/projects/EditProject";
import ProjectDetails from "./views/projects/ProjectDetails";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import NewCodeView from "./views/auth/NewCodeView";


export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route 
                        path="/" 
                        element={<DashboardView/>} index 
                    />
                    <Route 
                        path="/projects/create" 
                        element={<CreateProject />}
                    />
                    <Route 
                        path="/projects/:projectId" 
                        element={<ProjectDetails />}
                    />
                    <Route 
                        path="/projects/:projectId/edit" 
                        element={<EditProject />}
                    />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route 
                        path="/auth/login"
                        element={<LoginView />}
                    />
                    <Route 
                        path="/auth/register"
                        element={<RegisterView />}
                    />
                    <Route 
                        path="/auth/confirm-email"
                        element={<ConfirmAccountView />}
                    />
                    <Route 
                        path="/auth/request-confirmation-code"
                        element={<NewCodeView />}
                    />
                </Route>           
            </Routes>
        </BrowserRouter>
    )
}