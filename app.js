/**********************************
 *              EXPRESS           *
 **********************************/

/**************************************************
 *              Required node modules
 **************************************************/
const express = require('express');             //Help to configure NodeJs server
const app = express();
const bodyParser = require("body-parser");      //Help to interact with body of request
app.use(bodyParser.json());
const mongoose = require('mongoose');           //Help to interact with mongoDB

//Enregistrement des routes au niveau application
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

/**************************************************
 *              Connection to mongoDB
 **************************************************/
mongoose.connect('mongodb+srv://admin_user:TJsUeeu47JRjwu@gofullstack.3w8m5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Association de l'API routes+controlleurs à l'application
//Racine des routes en argument n°1
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);


//Export de app permettant aux autres fichiers d'y accéder (notamment node)
module.exports = app;
