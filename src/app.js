const express = require("express");
const app = express();

app.use(express.json());

// routes here
const registrationRoutes = require("./routes/registration.routes");
const attendanceRoutes = require("./routes/attendance.routes");

// use routes
app.use("/api", registrationRoutes);
app.use("/api", attendanceRoutes);

module.exports = app;

