import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h1 className="font-black text-center text-4xl text-white">Página no encontrada</h1>
            <p className="mt-10 text-center text-xl text-white">
                No encontramos la página que buscas. <br/>
                <Link
                    to={'/'}
                    className="text-secondary font-semibold text-lg"
                >
                    Volver al inicio
                </Link>
            </p>
        </>
    )
}
