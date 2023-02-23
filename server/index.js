const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

//use express.json() to get data into json format
app.use(express.json());
//port
const PORT = process.env.PORT || 3001;

//use cors
app.use(cors());
//import routes
const TodoItemRoute = require("./routes/todoItems.js");

//connect db
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.use("/", TodoItemRoute);

app.listen(PORT, () => console.log("server is running... "));
