import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Ensayo } from "../types/Ensayo";

type EnsayosContextType = {
    ensayos: Ensayo[];
    addEnsayo: (ensayo: Ensayo) => void;
    deleteEnsayo: (id:number) => void;
}

const EnsayosContext = createContext<EnsayosContextType | null>(null);

export function EnsayosProvider({children}: {children: ReactNode}) {

    const [ensayos, setEnsayos] = useState<Ensayo[]>([]);


    const addEnsayo = (ensayo: Ensayo) => {

        setEnsayos((prev) => [
            ...prev,
            ensayo
        ]);

    };

    const deleteEnsayo = (id:number) => {
        setEnsayos((prev) =>
            prev.filter(
                (ensayo) => ensayo.id !== id
            )
        )
    }


    return (
        <EnsayosContext.Provider
            value={{
                ensayos,
                addEnsayo,
                deleteEnsayo
            }}
        >
            {children}
        </EnsayosContext.Provider>
    );

}



export function useEnsayos(){

    const context = useContext(EnsayosContext);


    if(!context){
        throw new Error(
            "useEnsayos debe usarse dentro de EnsayosProvider"
        );
    }


    return context;

}