const membersService = require("../services/members.service");


function getMembers(req, res) {

    const members = membersService.getAllMembers();

    res.json(members);

}


function createMember(req, res) {

    try {

        const member = membersService.createMember(req.body);

        res.json(member);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}


function updateMember(req, res) {

    try {

        const member = membersService.updateMember(
            req.params.id,
            req.body
        );

        res.json(member);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}


function deleteMember(req, res) {

    try {

        membersService.deleteMember(req.params.id);

        res.json({
            message: "Miembro eliminado"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}


module.exports = {
    getMembers,
    createMember,
    updateMember,
    deleteMember
};