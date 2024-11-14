const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs blog",
      description: "Un blog simple crée avec NodeJs et MongoDb.",
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/post/{id}");

module.exports = router;

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Les Bases du HTML",
//       body: "Construisez Votre Première Page Web Découvrez comment le HTML structure les pages web. Apprenez les balises essentielles et construisez votre première page statique avec du texte, des images, et des liens.",
//     },
//     {
//       title: "Introduction au CSS",
//       body: " Rendez Vos Pages Web Esthétiques Le CSS permet de styliser vos pages HTML. Découvrez comment utiliser les sélecteurs, couleurs, polices, marges et bien plus pour transformer un simple HTML en une interface élégante.",
//     },
//     {
//       title: "Comprendre le JavaScript",
//       body: "Ajoutez de l’Interactivité à Votre Site Apprenez les fondamentaux du JavaScript pour dynamiser vos pages web. Des boutons interactifs aux animations, découvrez comment ajouter des fonctionnalités essentielles.",
//     },
//     {
//       title: "Bootstrap",
//       body: "Développez Rapidement des Sites Web Responsifs Découvrez Bootstrap, une bibliothèque CSS qui simplifie le design responsive. Créez des mises en page adaptatives, des boutons et des éléments de navigation facilement.",
//     },
//     {
//       title: "Flexbox",
//       body: " La Méthode Simple pour Organiser les Éléments en CSS Plongez dans Flexbox, un module CSS puissant pour aligner, centrer et répartir les éléments. Facilitez la création de layouts adaptatifs avec cette technique incontournable.",
//     },
//     {
//       title: "Les Grid Layouts CSS",
//       body: "Maîtrisez la Mise en Page Complexe Apprenez à utiliser CSS Grid pour concevoir des mises en page complexes en quelques lignes. Simplifiez l'organisation des sections et développez des structures flexibles.",
//     },
//     {
//       title: "Les API Web",
//       body: "Communiquer avec le Monde Extérieur Les API permettent d’interagir avec des services externes. Découvrez comment les utiliser pour intégrer des données en temps réel, comme des prévisions météo ou des cartes.",
//     },
//     {
//       title: "Les Frameworks JavaScript",
//       body: "Quelle Différence entre React, Vue et Angular ? Un tour d’horizon des frameworks JavaScript populaires. Découvrez leurs avantages, leurs particularités, et comment choisir celui qui convient à votre projet.",
//     },
//     {
//       title: "Déboguer Votre Code",
//       body: "Conseils pour Résoudre les Problèmes Courants Apprenez les bases du débogage pour identifier et corriger les erreurs. Découvrez des outils et astuces pour tester et améliorer la robustesse de votre code.",
//     },
//     {
//       title: "SEO Technique",
//       body: "Optimiser votre Code pour les Moteurs de Recherche Améliorez la visibilité de votre site grâce au SEO technique. Découvrez les meilleures pratiques pour structurer votre code et le rendre accessible aux moteurs de recherche.",
//     },
//     {
//       title: "Responsivité Mobile",
//       body: "Adapter son Site à Tous les Écrans Apprenez à utiliser des techniques CSS et des media queries pour créer des sites web responsifs qui s’adaptent parfaitement aux smartphones, tablettes et ordinateurs.",
//     },
//     {
//       title: "Les Micro-Interactions en CSS",
//       body: "Rendez Votre Site Plus Vivant Découvrez comment utiliser les animations CSS pour créer des micro-interactions, comme des boutons cliquables ou des effets au survol, qui améliorent l'expérience utilisateur.",
//     },
//     {
//       title: "Le Local Storage en JavaScript",
//       body: "Sauvegardez des Données Utilisateur Découvrez comment le local storage vous permet de stocker des données côté client pour conserver les préférences utilisateur, même après la fermeture du navigateur.",
//     },
//     {
//       title: "AJAX et Fetch",
//       body: "Charger du Contenu Sans Recharger la Page Explorez AJAX et Fetch, des techniques pour charger des données dynamiquement. Apprenez comment afficher de nouvelles informations sans forcer l'utilisateur à recharger la page.",
//     },
//     {
//       title: "Les Méta-Tags HTML",
//       body: "Améliorez le Référencement et le Partage Social Les méta-tags influencent le SEO et l’apparence des partages sur les réseaux. Apprenez à les configurer pour optimiser la visibilité de vos pages.",
//     },
//   ]);
// }

// insertPostData();
