/*****************************************
 *              EXPRESS ROUTES           *
 *****************************************/

/**************************************************
 *              Required node modules
 **************************************************/

const express = require('express');     //Help to configure NodeJs server
const router = express.Router();

//Association des fonctions aux routes
const stuffController = require('../controllers/stuff');
//Middleware d'authentification
const auth = require('../middleware/auth');


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
//Thing
// Grâce à router le chemin /api/stuff/ est juste /
//Pas de () car on n'appelle pas la fonction, on l'applique
router.post('/', auth, stuffController.createThing);


/**************************************************
 *                     HTTP PUT
 **************************************************/
router.put('/:id', auth, stuffController.modifyThing);

/**************************************************
 *                     HTTP DELETE
 **************************************************/
router.delete('/:id', auth, stuffController.deleteThing);

/**************************************************
 *                     HTTP GET
 **************************************************/
router.get('/:id', auth, stuffController.getThingById);
router.get('/', auth, stuffController.getAllThings);



module.exports = router;