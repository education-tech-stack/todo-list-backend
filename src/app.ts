import express from "express";
const dotenv = require("dotenv").config();
import cookieParser from "cookie-parser";
import db from "./models";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import cors from 'cors';

const PORT = process.env.PORT || 8080;
const app = express();

//middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ alter: { drop: false } }).then(() => {
  console.log("db has been re sync");
});

//routes for the user API
app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
