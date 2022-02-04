const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
// objet pour déclarer le modele 
// npm install validator renvoie true ou false de l'email est correcte ou non
// timestamps pour informer que le compte à bien été créé
// sur mongodb compass les comptes ont bien été créés

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, 
      max: 1024,
      minlength: 6
    }
  },
  {
    timestamps: true,
  }
);
// npm install bcrypt pour crypter les passwords
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// faire correspondre le mot de passe salt et le mot de passe non cryptées
userSchema.statics.login = async function(email, password){
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth){
      return user;
    }
    throw Error('Mot de passe incorrecte !');
  }
  throw Error('Email incorrecte !')
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;