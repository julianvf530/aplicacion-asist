import { useState } from "react";

type attendanceSetupProps={
    onStart: (date: string, type: "Ensayo" | "Evento")=> void
}

export default function AttendanceSetup ({onStart}: attendanceSetupProps) {
    
    // Estados
    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [type, setType] = useState<"Ensayo" | "Evento">("Ensayo");

    // Función para comenzar el ensayo
    const handleStart = () => {
        onStart(date, type);
    };

    return (
        <div>
            <h2>Preparar ensayo</h2>

            <div>
                <label>Fecha</label>
                <br />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Tipo</label>

                <div>
                    <label>
                        <input
                            type="radio"
                            checked={type === "Ensayo"}
                            onChange={() => setType("Ensayo")}
                        />
                        Ensayo
                    </label>
                </div>

                <div>
                    <label>
                        <input
                            type="radio"
                            checked={type === "Evento"}
                            onChange={() => setType("Evento")}
                        />
                        Evento especial
                    </label>
                </div>
            </div>

            <br />

            <button onClick={handleStart}>
                Comenzar ensayo
            </button>
        </div>
    );
}