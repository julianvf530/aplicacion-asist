const membersRepository = require("../repositories/members.repository");


function getAllMembers(){

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

    return membersRepository.updateMember(id, member);

}

function deleteMember(id){
    return membersRepository.deleteMember(id);
}

module.exports = {
    getAllMembers,
    createMember,
    updateMember,
    deleteMember
};