import { useEffect, useState } from "react";

import type { Ensayo } from "../types/Ensayo";

import {
    getEnsayos,
    createEnsayo as createEnsayoApi,
    deleteEnsayo as deleteEnsayoApi
} from "../api/ensayoApi";


export function useEnsayos() {

    const [ensayos, setEnsayos] = useState<Ensayo[]>([]);


    async function loadEnsayos() {

        const data = await getEnsayos();

        setEnsayos(data);

    }


    useEffect(() => {

        loadEnsayos();

    }, []);


    async function createEnsayo(
    ensayo: Omit<Ensayo, "id">
    ){

        const nuevoEnsayo =
            await createEnsayoApi(ensayo);

        setEnsayos(prev => [
            ...prev,
            nuevoEnsayo
        ]);

        return nuevoEnsayo;

    }

    async function deleteEnsayo(id: number) {

    await deleteEnsayoApi(id);

        setEnsayos((prev) =>
            prev.filter((ensayo) => ensayo.id !== id)
        );

    }
    
    return {
        ensayos,
        loadEnsayos,
        createEnsayo,
        deleteEnsayo
    };

}