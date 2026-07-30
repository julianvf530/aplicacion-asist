const membersService= require("../services/members.service")

function getMembers(req,res){
   
    const members= membersService.getAllMembers();

    res.json(members);
}

function createMember(req, res) {

    try {

        const member =
            membersService.createMember(req.body);

        res.json(member);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}


function updateMember(req,res){

    const member = membersService.updateMember(
        req.params.id,
        req.body
    );

    res.json(member);

}


function deleteMember(req,res){

    membersService.deleteMember(
        req.params.id
    );

    res.json({
        message:"Miembro eliminado"
    });

}


module.exports = {
    getMembers,
    createMember,
    updateMember,
    deleteMember
};