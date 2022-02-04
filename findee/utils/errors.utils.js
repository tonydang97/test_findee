module.exports.signUpErrors = (error) => {
    let errors = { pseudo: '', email: '', password: 'Mauvais mot de passe'}

    if(error.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrecte ou déja pris";

    if(error.message.includes('email'))
        errors.email = "Email incorrecte";

    if(error.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caractères minimum";

    if(error.code === 11000 && Object.keys(error.keyValue)[0].includes('pseudo'))
        errors.email = "Cet pseudo est déja pris";
   
    if(error.code === 11000 && Object.keys(error.keyValue)[0].includes('email'))
        errors.email = "Cet email est déja enregistré";

    return errors
};

module.exports.signInErrors = (error) => {
    let errors = { email: '', password: ''}
  
    if (error.message.includes("email")) 
      errors.email = "Email inconnu";
    
    if (error.message.includes('password'))
      errors.password = "Le mot de passe ne correspond pas"
  
    return errors;
  }
