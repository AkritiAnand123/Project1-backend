require("dotenv").config();
const express = require("express");
const app = express();
const registrationRoutes = require("./src/routes/registration.routes");
app.use("/api", registrationRoutes);

const testRoutes = require("./src/routes/test.routes");
app.use("/api", testRoutes);

app.get("/", (req, res, next) => {
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port Server running on address http://localhost:${PORT}`);
});
