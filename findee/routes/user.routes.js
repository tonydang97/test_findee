const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// si l'utilisateur va dans api/user/register ça declenche la fonction signup
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// user db
router.get('/', userController.getAllUsers);
router.get ('/:id', userController.userInfo)

// supprimer des users
router.delete('/:id', userController.deleteUser);



module.exports = router;