const mongoose = require("mongoose");

// concactener les élements que l'on ne veut pas partager
mongoose
  .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.ag2r0.mongodb.net/findee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecter a mongodb"))
  .catch((error) => console.log("La connection a Mongodb à échoué", error));
