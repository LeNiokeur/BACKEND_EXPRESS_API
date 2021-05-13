/**********************************************
 *              GESTIONNAIRE TOKEN            *
 **********************************************/

/**************************************************
 *              Required node modules
 **************************************************/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //Récupération du token dans le header d'authentification
        const token = req.headers.authorization.split(' ')[1];      //Récupère le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');      //Retourne un obj JS contenant l'userId
        const userId = decodedToken.userId;
        //Si on a un userId dans le corps de la requête et s'il est différent
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';          //Envoi dans le catch
        } else {
            //On passe au middleware qui effectue l'action demandée à la base
            next();
        }
    } catch(error) {
        // envoi de l'erreur si on en recoit une sinon | Message
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};