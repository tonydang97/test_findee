const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    // on va chercher la table users, et on prend tout sauf le password
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
    // params correspond aux parametres que l'on met dans l'url
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    UserModel.findById(req.params.id, (error, docs) => {
        // docs = data qui est contenu
        if(!error) res.send(docs);
        else console.log('ID inconnu: ' + error);
    }).select('-password');
};

module.exports.deleteUser = async (req, res) => {
    // on vérifie toujours l'id
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)
    // L'id passé en paramètres on le remove
    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Utilisateur supprimer !"});
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}