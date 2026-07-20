import MenuCard from "../../components/MenuCard";
import { useNavigate } from "react-router-dom";


export default function Home(){
    let navigate = useNavigate();
    return (
        <div>
        <MenuCard
            title= "Registar ensayo"
            click= {() => navigate("/attendance")}
        />

        <MenuCard 
            title= "historial"
            click= {() => navigate("/history")}
        />

        <MenuCard 
            title= "Miembros" 
            click= {() => navigate("/members")} 
        />

        <MenuCard 
            title= "Estadisticas"
            click= {() => navigate("/statistics")} 
        />
        
        </div>
    );
}