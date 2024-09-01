import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
    return (
        <>
            <div className="bg-primary min-h-screen">
                <div className="mx-auto first:w-full h-screen">
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
