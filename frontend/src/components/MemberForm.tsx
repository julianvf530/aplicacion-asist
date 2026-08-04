import { useState } from "react";

import type { Member } from "../types/Member";

import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

type MemberFormProps = {
    member?: Member;
    onSave: (member: Member) => void;
    onCancel?: () => void;
};

export default function MemberForm({
    member,
    onSave,
    onCancel
}: MemberFormProps) {

    const [numero, setNumero] = useState(
        member?.numero?.toString() ?? ""
    );

    const [nombre, setNombre] = useState(
        member?.nombre ?? ""
    );

    const [categoria, setCategoria] = useState(
        member?.categoria ?? ""
    );

    const [instrumento, setInstrumento] = useState(
        member?.instrumento ?? ""
    );

    const [numeroError, setNumeroError] = useState("");

    const [nombreError, setNombreError] = useState("");

    const [categoriaError, setCategoriaError] = useState("");

    const [instrumentoError, setInstrumentoError] = useState("");

    const handleSubmit = () => {

        let valid = true;

        setNumeroError("");
        setNombreError("");
        setCategoriaError("");
        setInstrumentoError("");

        if (
            numero.trim() === "" ||
            Number(numero) <= 0 ||
            !Number.isInteger(Number(numero))
        ) {

            setNumeroError("Introduce un número válido");

            valid = false;

        }

        if (nombre.trim() === "") {

            setNombreError("El nombre es obligatorio");

            valid = false;

        }

        if (categoria === "") {

            setCategoriaError("Selecciona una categoría");

            valid = false;

        }

        if (instrumento === "") {

            setInstrumentoError("Selecciona un instrumento");

            valid = false;

        }

        if (!valid) {
            return;
        }

        const updatedMember: Member = {

            id: member
                ? member.id
                : Date.now(),

            numero: Number(numero),

            nombre,

            categoria,

            instrumento

        };

        onSave(updatedMember);

    };

    return (

        <Card
            className="
                max-w-xl
                mb-6
            "
        >

            <h2
                className="
                    text-2xl
                    font-bold
                    mb-6
                "
            >

                {
                    member
                        ? "Editar miembro"
                        : "Añadir miembro"
                }

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
                            text-sm
                            font-medium
                            mb-2
                        "
                    >
                        Número
                    </label>

                    <Input
                        type="number"
                        min="1"
                        placeholder="Número de orden"
                        value={numero}
                        onChange={(e) =>
                            setNumero(e.target.value)
                        }
                    />

                    {numeroError && (

                        <p className="text-red-500 text-sm mt-1">
                            {numeroError}
                        </p>

                    )}

                </div>

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            mb-2
                        "
                    >
                        Nombre
                    </label>

                    <Input
                        type="text"
                        placeholder="Nombre del miembro"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                    />

                    {nombreError && (

                        <p className="text-red-500 text-sm mt-1">
                            {nombreError}
                        </p>

                    )}

                </div>

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            mb-2
                        "
                    >
                        Categoría
                    </label>

                    <select
                        value={categoria}
                        onChange={(e) =>
                            setCategoria(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-lg
                            px-3
                            py-2
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    >

                        <option value="">
                            Selecciona una categoría
                        </option>

                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="R">R</option>
                        <option value="E">E</option>

                    </select>

                    {categoriaError && (

                        <p className="text-red-500 text-sm mt-1">
                            {categoriaError}
                        </p>

                    )}

                </div>

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            mb-2
                        "
                    >
                        Instrumento
                    </label>

                    <select
                        value={instrumento}
                        onChange={(e) =>
                            setInstrumento(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-lg
                            px-3
                            py-2
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    >

                        <option value="">
                            Selecciona un instrumento
                        </option>

                        <option value="Clarinete">Clarinete</option>
                        <option value="Flauta">Flauta</option>
                        <option value="Oboe">Oboe</option>
                        <option value="Fagot">Fagot</option>
                        <option value="Saxo Alto">Saxo Alto</option>
                        <option value="Saxo Tenor">Saxo Tenor</option>
                        <option value="Saxo Barítono">Saxo Barítono</option>
                        <option value="Trompeta">Trompeta</option>
                        <option value="Trompa">Trompa</option>
                        <option value="Trombón">Trombón</option>
                        <option value="Bombardino">Bombardino</option>
                        <option value="Tuba">Tuba</option>
                        <option value="Percusión">Percusión</option>

                    </select>

                    {instrumentoError && (

                        <p className="text-red-500 text-sm mt-1">
                            {instrumentoError}
                        </p>

                    )}

                </div>

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        pt-2
                    "
                >

                    {
                        onCancel && (

                            <Button
                                variant="secondary"
                                onClick={onCancel}
                            >
                                Cancelar
                            </Button>

                        )
                    }

                    <Button
                        onClick={handleSubmit}
                    >

                        Guardar

                    </Button>

                </div>

            </div>

        </Card>

    );

}