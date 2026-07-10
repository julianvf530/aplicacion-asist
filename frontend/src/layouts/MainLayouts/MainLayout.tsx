import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <h1>Control de Asistencia</h1>

            <Outlet />
        </>
    );
}