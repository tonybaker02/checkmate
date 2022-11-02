const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors');
const path =require('path')

const app = express();

//Connect to Database
connectDB();

//Init Middleware
//https://stackoverflow.com/questions/59997685/postman-can-not-read-request-body
app.use(express.json({extended: false}));

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }));

//app.get('/',(req,res) => res.send('API RUNNING'));

//define Routes - PORT 5500 *

//http://localhost:5500/api/client
app.use('/api/client', require('./routes/api/client'));

//primary CheckMate Routes
//http://localhost:5500/api/users
app.use('/api/users', require('./routes/api/users'));
//http://localhost:5500/api/auth

app.use('/api/auth', require('./routes/api/auth'));
//http://localhost:5500/api/pharma
app.use('/api/pharma', require('./routes/api/pharma'));
//http://localhost:5500/api/medicalGroup
app.use('/api/medicalGroup', require('./routes/api/medicalGroup'));
//http://localhost:5500/api/physicians
app.use('/api/physicians', require('./routes/api/physicians'));
//http://localhost:5500/api/manager
app.use('/api/manager', require('./routes/api/manager'));
//http://localhost:5500/api/rep
app.use('/api/rep', require('./routes/api/rep'));
//http://localhost:5500/api/receipt
app.use('/api/receipt', require('./routes/api/receipt'));


//Server static assets in production
//ALSO DON'T FORGET TO CHANGE OUT THE .ENV FILE TO HEROJU'S PUBLIC SERVICE URL
//BELOW IS FOR WHEN YOU ARE DEPLOYING TO HEROKU TO USE A SEPERATE ENDPOINT FOR THE SERVICE
//EACT_APP_SERVICE_URL = 'https://pure-gorge-49930.herokuapp.com/api'

if(process.env.NODE_ENV === 'production')
{
    //Set static folder (our public folder) - dist = VUE JS/ build = react
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html')); 
    })

}


//HEROKU LOOKS AT THE porcess.env.PORT
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));