const membersRepository = require("../repositories/members.repository");


function getAllMembers() {

    return membersRepository.getAllMembers();

}


function createMember(member) {

    if (!member.nombre?.trim()) {
        throw new Error("El nombre es obligatorio");
    }

    if (!member.categoria?.trim()) {
        throw new Error("La categoría es obligatoria");
    }

    if (!member.instrumento?.trim()) {
        throw new Error("El instrumento es obligatorio");
    }

    if (
        member.numero === undefined ||
        member.numero === null ||
        !Number.isInteger(Number(member.numero)) ||
        Number(member.numero) <= 0
    ) {
        throw new Error("El número debe ser un entero mayor que 0");
    }

    member.numero = Number(member.numero);

    return membersRepository.createMember(member);

}


function updateMember(id, member) {

    if (!member.nombre?.trim()) {
        throw new Error("El nombre es obligatorio");
    }

    if (!member.categoria?.trim()) {
        throw new Error("La categoría es obligatoria");
    }

    if (!member.instrumento?.trim()) {
        throw new Error("El instrumento es obligatorio");
    }

    if (
        member.numero === undefined ||
        member.numero === null ||
        !Number.isInteger(Number(member.numero)) ||
        Number(member.numero) <= 0
    ) {
        throw new Error("El número debe ser un entero mayor que 0");
    }

    member.numero = Number(member.numero);

    return membersRepository.updateMember(id, member);

}


function deleteMember(id) {

    return membersRepository.deleteMember(id);

}


module.exports = {
    getAllMembers,
    createMember,
    updateMember,
    deleteMember
};