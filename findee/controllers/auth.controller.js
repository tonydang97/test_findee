const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        // 3 jours
        expiresIn: maxAge
    })
};

// SIGN UP *********************************************************************************
module.exports.signUp = async(req, res) => {
    // pseudo = req.body.pseudo etc...
    console.log(req.body);
    const {pseudo, email, password} = req.body

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id });
    }
    catch(error) {
        const errors = signUpErrors(error)
        res.status(200).send({ errors })
    }
}

// SIGN IN **********************************************************************************
// npm i -s jsonwebtoken
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    // Recuperer l'email et password et tout stocker dans user
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id})
    } catch (error) {
        const errors = signInErrors(error)
        res.status(200).json({ errors });
    }
}


// LOGOUT ************************************************************************************
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}