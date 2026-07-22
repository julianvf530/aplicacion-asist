import { useNavigate } from "react-router-dom"

export default function Header(){
    const navigate = useNavigate()
    
    return (
        <header onClick={() => navigate("/")}>
            <h1>
                Control de asistencia
            </h1>
        </header>
    )
}