/*****************************************
 *              EXPRESS ROUTES           *
 *****************************************/

/**************************************************
 *              Required node modules
 **************************************************/

const express = require('express');     //Help to configure NodeJs server
const router = express.Router();

//Association des fonctions aux routes
const userController = require('../controllers/user')

/**************************************************
 *              HTTP request headers
 **************************************************/
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');          //CORS
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/**************************************************
 *                     HTTP POST
 **************************************************/
//Routes POST car on envoie le mail et le password (GET n'a pas de body)
router.post('/signup', userController.signup);
router.post('/login', userController.login);



module.exports = router;