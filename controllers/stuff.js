/**********************************************
 *              EXPRESS CONTROLLERS           *
 **********************************************/

/**************************************************
 *              Required node modules
 **************************************************/


/**************************************************
 *              mongoDB data models
 **************************************************/
const Thing = require('../models/Thing')

/**************************************************
 *              Functions controllers
 **************************************************/

/**************************************************
 *                     HTTP POST
 **************************************************/

exports.createThing = (req, res, next) => {
    //Le champ id qui sera automatiquement généré par mongoDB est également généré par le front end
    //Il faut le supprimer
    delete req.body._id;
    const thing = new Thing({
        // title: req.body.title,
        // description: req.body.description,

        //equivalent à :
        ...req.body
    });
    //Renvoie une promesse (capturé par then ou catch)
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};


/**************************************************
 *                     HTTP PUT
 **************************************************/

exports.modifyThing = (req, res, next) => {
    //Mise à jour d'un element en le filtrant avec son id
    //Puis mise à jour de l'élément avec les éléments de la req, tout en précisant que l'id est bien l'ancien
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};



/**************************************************
 *                     HTTP DELETE
 **************************************************/


 exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message:'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error}));
};


/**************************************************
 *                     HTTP GET
 **************************************************/

exports.getThingById = (req, res, next) => {
    //Accès à :id dynamique avec : req.params.id
    Thing.findOne({_id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch( error => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }))
};
