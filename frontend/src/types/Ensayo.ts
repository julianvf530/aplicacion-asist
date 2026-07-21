import type { AttendanceMember } from "./AttendanceMember"

export type Ensayo = {
    id: number;
    fecha: string;
    tipo: "Ensayo" | "Evento";
    asistencia: AttendanceMember[];
};