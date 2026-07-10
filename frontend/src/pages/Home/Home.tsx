import MenuCard from "../../components/MenuCard";

export default function Home(){
    return (
        <div>
        <MenuCard
            title= "Registar ensayo"
            click= {() => console.log("pulsado")}
            />
        <MenuCard title= "historial"
        click= {() => console.log("pulsado")}
            />
        <MenuCard title= "Miembros" 
        click= {() => console.log("pulsado")} />
        <MenuCard title= "Estadisticas"
        click= {() => console.log("pulsado")} />
        
        </div>
    );
}