const express = require('express');
const ConnectDB = require('../db/connect')
const Tasks = require('../routes/tasks.router')
require('dotenv').config()
const PORT = process.env.PORT || 5500

const app = express();
app.use(express.json())

app.use('/api/v1/tasks', Tasks)










const STARTAPP = async () => {
    try {
        await ConnectDB(process.env.MONGO_DB_URL)
        app.listen(PORT, () => { console.log('DB & Server Connect http://127.0.0.1:5500'); })
    }
    catch (error) {
        console.log(error);
    }
}

STARTAPP()

