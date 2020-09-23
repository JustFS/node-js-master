const express = require("express");
const router = express.Router();
const twig = require("twig");

router.get("/", (req, res) => {
  console.log('get/test');
  res.render("accueil.html.twig")
})

router.get("/livres", (req, res) => {
  res.render('livres/liste.html.twig');
})
 
router.get("/livres/:nom", (req, res) => {
  // on passe le nom en object JSON pour le retrouver après
  res.render("livres/livre.html.twig", {nom: req.params.nom})
})

// gérer erreur 404
router.use((req, res, suite) => {
  const error = new Error("Page non trouvée");
  error.status = 404;
  suite(error);
})

// gérer toutes les erreurs
router.use((error, req, res) => {
  res.status(error.status || 500);
  res.end(error.message);
})

module.exports = router;
