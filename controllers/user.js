/**********************************************
 *              EXPRESS CONTROLLERS           *
 **********************************************/

/**************************************************
 *              mongoDB data models
 **************************************************/
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



/**************************************************
 *              Functions controllers
 **************************************************/

exports.signup = (req, res, next) => {
    //Hashage du mdp est une fonction async qui prend du temps
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email })
        .then(user => {
            //No user found
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then( valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        userID: user._id,
                        //Ce token sera vérifié par le back à chaque requête du front
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch( error => res.status(500).json({ error }));
};

