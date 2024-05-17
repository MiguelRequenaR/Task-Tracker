import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"

//El componente especial para renderizar un layout en React Router es Outlet. Outlet es un componente que se utiliza para renderizar las rutas secundarias anidadas dentro de una ruta principal. En este caso, Outlet se utiliza para renderizar las rutas secundarias dentro de AppLayout.

export default function AppLayout() {
    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row  justify-between items-center">
                    <div className="w-64">
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>
                    <NavMenu />

                </div>
            </header>
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center">
                    &copy; 2021 All rights reserved {new Date().getFullYear()}
                </p>
            </footer>
            <ToastContainer 
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
