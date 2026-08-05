const ExcelJS = require("exceljs");

const exportRepository =
    require("../repositories/export.repository");


async function exportEnsayo(id) {

    const members =
        exportRepository.getEnsayoForExport(id);


    const workbook = new ExcelJS.Workbook();

    const worksheet =
        workbook.addWorksheet("Asistencia");


    worksheet.columns = [

        {
            header: "Nº",
            key: "numero",
            width: 8
        },

        {
            header: "Nombre",
            key: "nombre",
            width: 40
        },

        {
            header: "Asistencia",
            key: "presente",
            width: 12
        }

    ];


    members.forEach((member) => {

        worksheet.addRow({

            numero: member.numero,

            nombre: member.nombre,

            presente: member.presente

        });

    });


    worksheet.getRow(1).font = {
        bold: true
    };


    return workbook;

}


module.exports = {
    exportEnsayo
};