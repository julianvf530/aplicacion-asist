import { useEnsayos } from "../../contexts/EnsayosContext";
import HistoryCard from "../../components/HistoryCard";

export default function History(){

    const {ensayos} = useEnsayos();

    return (
        <div>
            <h1>Historial</h1>
            
            {ensayos.map((ensayo) => (

                
                <HistoryCard 
                   
                    key={ensayo.id}
                    ensayo={ensayo}
                
                />
            
            ))}
        
        </div>
    );
}