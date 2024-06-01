import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
    return (
        <>
            <div className="bg-primary min-h-screen">
                <div className="py-10 lg:py-20 mx-auto w-[550px]">
                    <div className="mt-10">
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
