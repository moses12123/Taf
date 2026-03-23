// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');

// Définition des endpoints et liaison avec le contrôleur
router.get('/', ArticleController.getAllArticles);
router.get('/:id', ArticleController.getArticleById);
router.post('/', ArticleController.createArticle);
router.put('/:id', ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);

module.exports = router;
