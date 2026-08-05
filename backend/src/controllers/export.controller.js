const exportService =
    require("../services/export.services");


async function exportEnsayo(req, res) {

    const workbook =
        await exportService.exportEnsayo(
            req.params.id
        );


    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=ensayo_${req.params.id}.xlsx`
    );


    await workbook.xlsx.write(res);

    res.end();

}


module.exports = {
    exportEnsayo
};