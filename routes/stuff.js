/*****************************************
 *              EXPRESS ROUTES           *
 *****************************************/

/**************************************************
 *              Required node modules
 **************************************************/

const express = require('express');     //Help to configure NodeJs server
const router = express.Router();

//Association des fonctions aux routes
const stuffController = require('../controllers/stuff')


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
router.post('/', stuffController.createThing);


/**************************************************
 *                     HTTP PUT
 **************************************************/
router.put('/:id', stuffController.modifyThing);

/**************************************************
 *                     HTTP DELETE
 **************************************************/
router.delete('/:id', stuffController.deleteThing);

/**************************************************
 *                     HTTP GET
 **************************************************/
router.get('/:id', stuffController.getThingById);
router.get('/', stuffController.getAllThings);



module.exports = router;