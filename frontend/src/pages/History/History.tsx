import { useEnsayos } from "../../hooks/useEnsayos";
import { useToast } from "../../hooks/useToast";

import HistoryCard from "../../components/HistoryCard";

import PageContainer from "../../components/ui/PageContainer";

export default function History() {

    const {
        ensayos,
        deleteEnsayo
    } = useEnsayos();

    const { showToast } = useToast();


    const handleDelete = async (id: number) => {

        const confirmed = window.confirm(
            "¿Seguro que quieres eliminar este ensayo?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteEnsayo(id);

            showToast(
                "Ensayo eliminado correctamente",
                "success"
            );

        } catch {

            showToast(
                "Error al eliminar el ensayo",
                "error"
            );

        }

    };


    return (

        <PageContainer>

            <h1
                className="
                    text-3xl
                    font-bold
                    mb-6
                "
            >
                Historial
            </h1>

            {
                ensayos.length === 0 ? (

                    <p className="text-gray-600">
                        No hay ensayos registrados todavía.
                    </p>

                ) : (

                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                        "
                    >

                        {
                            ensayos.map((ensayo) => (

                                <HistoryCard

                                    key={ensayo.id}

                                    ensayo={ensayo}

                                    onDelete={handleDelete}

                                />

                            ))
                        }

                    </div>

                )
            }

        </PageContainer>

    );

}