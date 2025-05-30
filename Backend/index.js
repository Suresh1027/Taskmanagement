const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.static("public"));
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

app.use("/", authRoutes);
app.use("/", taskRoutes);
app.use("/", projectRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
