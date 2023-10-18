const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
dotenv.config();

const app = express();

//databse connection
const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUserParser: true,
    });
    console.log(
      `Connexion à la base de donnée avec success : ${conn.connection.host}`
    );
  } catch (error) {
    console.log("erreur avec la base de donnée " + error);
  }
};

//midlleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//set the template engine

app.set("view engine", "ejs");

//routes
app.use("", require("./routes/routes.js"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("demarrage du serveur sur http://localhost:" + port);
});
