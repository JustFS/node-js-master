const mongoose = require("mongoose");
const auteurSchema =require("../models/auteurs.modele");
const fs = require("fs");

exports.auteur_affichage = (requete, reponse) => {
    auteurSchema.findById(requete.params.id)
    .exec()
    .then(auteur => {
        console.log(auteur);
        reponse.render("auteurs/auteur.html.twig", {auteur : auteur});
    })
    .catch(error => {
        console.log(error);
    })
    
}