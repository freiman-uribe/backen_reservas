const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/routes');
const connectDB = require('./src/infrastructure/db')
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 const corsOptions = {
   origin: "*",
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   preflightContinue: false,
   optionsSuccessStatus: 204,
 };
app.use(cors(corsOptions));
router(app);
connectDB();

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
    console.table(`servicios arriba en puerto : ${app.get('port')}`);
});