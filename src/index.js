const express = require('express');
var app = express();
var router = require('./app/routes/routes');
const dotenv = require('dotenv').config();
const db = require('../src/config/db');
var path = require('path');
const Accounts = require('./app/models/Accounts');
const Argon2 = require('argon2');
const route = require('./app/routes/index')
const paypal = require('paypal-rest-sdk')
const exphbds = require('express-handlebars')
const cors = require('cors')
const methodOverride = require('method-override');
const bodyParser = require('body-parser')


db.connect();


app.use(bodyParser.urlencoded({
    extended: true
}));
//   app.use(methodOverride('_method'));

app.use(bodyParser.json());
route(app),

    app.use(cors());


app.set('views', path.join(__dirname, 'app', 'resources', 'views'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
console.log(path.join(__dirname, '../uploads'))
app.engine(
    'hbs',
    exphbds({
        extname: '.hbs',
    }, {
        defaultLayout: 'main'
    }),
);

app.set('view engine', 'hbs');

app.listen(process.env.PORT, () => {
    console.log('server start on port');
});