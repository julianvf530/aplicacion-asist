import { useState } from "react";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";


type AttendanceSetupProps = {

    onStart: (
        date:string,
        type:"Ensayo" | "Evento"
    ) => void;

};



export default function AttendanceSetup({

    onStart

}: AttendanceSetupProps) {


    const [date,setDate] = useState(

        new Date()
            .toISOString()
            .split("T")[0]

    );


    const [type,setType] = useState<
        "Ensayo" | "Evento"
    >("Ensayo");



    const handleStart = () => {

        onStart(date,type);

    };



    return (

        <Card
            className="
                max-w-xl
            "
        >


            <h2
                className="
                    text-xl
                    font-bold
                    mb-6
                "
            >

                Preparar ensayo

            </h2>



            <div
                className="
                    flex
                    flex-col
                    gap-5
                "
            >



                <div>


                    <label
                        className="
                            block
                            mb-2
                            font-medium
                        "
                    >

                        Fecha

                    </label>


                    <Input

                        type="date"

                        value={date}

                        onChange={(e)=>
                            setDate(e.target.value)
                        }

                    />


                </div>




                <div>


                    <label
                        className="
                            block
                            mb-2
                            font-medium
                        "
                    >

                        Tipo

                    </label>



                    <div
                        className="
                            flex
                            gap-6
                        "
                    >



                        <label
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <input

                                type="radio"

                                checked={
                                    type === "Ensayo"
                                }

                                onChange={() =>
                                    setType("Ensayo")
                                }

                            />


                            Ensayo


                        </label>




                        <label
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >


                            <input

                                type="radio"

                                checked={
                                    type === "Evento"
                                }

                                onChange={() =>
                                    setType("Evento")
                                }

                            />


                            Evento especial


                        </label>


                    </div>


                </div>



                <Button

                    onClick={handleStart}

                >

                    Comenzar ensayo

                </Button>



            </div>


        </Card>

    );

}