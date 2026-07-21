
export type AttendanceMember = {
    memberId : number;
    presente : boolean;
}

export type Attendance = {
    id:number;
    fecha: string;
    tipo : "Ensayo" | "Evento";
    registros : AttendanceMember[];

}