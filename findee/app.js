// pour coder plus rapidement car node.js est un langage trés proche du langage machine de base.
// .env permet de stocker des variables d'environnement.
const express = require('express');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config({path : './config/.env'});
require('./config/db');
const {checkUser} = require('./middleware/auth.middleware');
const {requireAuth} = require('./middleware/auth.middleware');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// npm install cookieparser pour lire et travailler sur les cookies.
app.use(cookieParser());

// jwt
// asurrer et sécurisé la connection utilisateur
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user', userRoutes);


// Fin du fichier app
app.listen(process.env.PORT, () =>{
    console.log(`Port : ${process.env.PORT}`);
})
