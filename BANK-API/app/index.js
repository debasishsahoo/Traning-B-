require('dotenv').config();
require('express-async-errors');

//EXTRA SECURITY PACKEGES
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

//Swagger
const swaggerUI = require('swagger-ui-express');
//const YAML = require("yamljs")
//const swaggerDoument = YAML.load('./swagger.yaml')
const swaggerJsdoc = require('swagger-jsdoc');

//Main Application
const express = require('express');

//Database
const connectDb = require('../db/connect');

//Router
const Customer = require('../routes/customer.router');
const Employee = require('../routes/employee.router');

//error Layer
const notFound = require('../error/notFound');
const errorHandler = require('../middlewares/errorHandler');

const PORT = process.env.PORT || 5500;

const app = express();
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 request per windowMS
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//Doc Block
app.get('/', (req, res) => {
  res.send('<h1>Bank API</h1><a href="/api-docs">Testing Docs</a>');
});

//Documentation Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bank Server Api',
      description: 'This is my API Documentation',
      version: 1.0,
      contact: {
        name: 'Debasish Sahoo',
        email: 'debasish.sahoo96@gmail.com',
      },
      servers: ['http://127.0.0.1:5500'],
    },
    schemes: ['http', 'https'],
  },
  apis: ['index.js', './models/*.js', './routes/*.js'],
};
const swaggerDoc = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use('/api/v1/customer', Customer);
app.use('/api/v1/employee', Employee);

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
