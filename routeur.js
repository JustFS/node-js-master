var express = require("express");
var routeur = express.Router();
const twig = require("twig");
const mongoose = require("mongoose");
const livreSchema =require("./models/livres.modele")

routeur.get("/", (requete, reponse) =>{
    reponse.render("accueil.html.twig")
})

routeur.get("/livres", (requete, reponse) =>{
    livreSchema.find()
        .exec()
        .then(livres => {
            reponse.render("livres/liste.html.twig", {liste : livres, message : reponse.locals.message})
        })
        .catch();
})

routeur.post("/livres", (requete, reponse) =>{
    const livre = new livreSchema({
        _id: new mongoose.Types.ObjectId(),
        nom: requete.body.titre,
        auteur: requete.body.auteur,
        pages: requete.body.pages,
        description: requete.body.description
    });
    livre.save()
    .then(resultat => {
        console.log(resultat);
        reponse.redirect("/livres");
    })
    .catch(error => {
        console.log(error);
    })
});

//Affichage détaillé d'un livre
routeur.get("/livres/:id", (requete,reponse) => {
    livreSchema.findById(requete.params.id)
    .exec()
    .then(livre => {
        reponse.render("livres/livre.html.twig",{livre : livre, isModification:false})
    })
    .catch(error => {
        console.log(error);
    })
})

//Modification d'un livre (formulaire)
routeur.get("/livres/modification/:id", (requete, reponse)=> {
    livreSchema.findById(requete.params.id)
    .exec()
    .then(livre => {
        reponse.render("livres/livre.html.twig",{livre : livre, isModification:true})
    })
    .catch(error => {
        console.log(error);
    })
})

routeur.post("/livres/modificationServer", (requete, reponse) => {
    const livreUpdate = {
        nom : requete.body.titre,
        auteur: requete.body.auteur,
        pages : requete.body.pages,
        description : requete.body.description
    }
    livreSchema.updateOne({_id:requete.body.identifiant}, livreUpdate)
    .exec()
    .then(resultat => {
        if(resultat.nModified < 1) throw new Error("Requete de modification échouée");
        requete.session.message = {
            type : 'success',
            contenu : 'modification effectuée'
        }
        reponse.redirect("/livres");
    }) 
    .catch(error => {
        console.log(error);
        requete.session.message = {
            type : 'danger',
            contenu : error.message
        }
        reponse.redirect("/livres");
    })
})

routeur.post("/livres/delete/:id", (requete, reponse) => {
    livreSchema.remove({_id:requete.params.id})
    .exec()
    .then(resultat => {
        requete.session.message = {
            type : 'success',
            contenu : 'Suppression effectuée'
        }
        reponse.redirect("/livres");
    })
    .catch(error => {
        console.log(error);
    })
});

routeur.use((requete,reponse,suite) => {
    const error = new Error("Page non trouvée");
    error.status= 404;
    suite(error);
})

routeur.use((error,requete,reponse) => {
    reponse.status(error.status || 500);
    reponse.end(error.message);
})

module.exports = routeur;