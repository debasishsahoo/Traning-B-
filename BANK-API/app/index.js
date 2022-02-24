
require("dotenv").config();
require("express-async-errors");


const express = require("express");
const connectDb = require("../db/connect");

const Customer = require("../routes/customer.router");
const Employee = require("../routes/employee.router");

const notFound = require("../middlewares/notFound");
const errorHandler = require("../middlewares/errorHandler");

const PORT = process.env.PORT || 5500;
const app = express();
app.use(express.json());



app.use("/api/v1/customer", Customer);
app.use("/api/v1/employee", Employee);

app.use(notFound);
app.use(errorHandler);

const startApp = async () => {
  try {
    await connectDb(process.env.MONGO_DB_URL);
    app.listen(PORT, () =>
      console.log(`DB & Server connected on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};
startApp();
