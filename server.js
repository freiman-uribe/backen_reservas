const express = require('express'); 
const bodyParser = require('body-parser');
const router = require('./src/routes');
const connectDB = require('./src/infrastructure/db')
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

router(app);
connectDB();

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
    console.table(`servicios arriba en puerto : ${app.get('port')}`);
});