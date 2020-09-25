var express = require("express");
var routeur = express.Router();
const twig = require("twig");

const auteurController = require("../controllers/auteur.controller");

routeur.get("/:id",auteurController.auteur_affichage);

module.exports = routeur;