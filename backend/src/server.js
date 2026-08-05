const express = require("express");
const cors = require("cors");

const membersRouter = require("./routes/members.routes");
const ensayosRoutes = require("./routes/ensayos.routes");
const statisticsRoutes = require("./routes/statistics.routes");
const exportRoutes = require("./routes/export.routes");
const importRoutes = require("./routes/import.routes");

const errorHandler = require("./middlewares/error.middleware");

require("./database/initDatabase");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/members", membersRouter);
app.use("/api/ensayos", ensayosRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/import", importRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API asistencia"
    });
});


app.use(errorHandler);

app.listen(3000, () => {
    console.log("Servidor operativo en 3000");
});