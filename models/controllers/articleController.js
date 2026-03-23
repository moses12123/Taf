// controllers/articleController.js
const ArticleDAO = require('../models/articleModel');

class ArticleController {
    // GET /api/articles
    static getAllArticles(req, res) {
        try {
            const articles = ArticleDAO.getAll();
            res.status(200).json(articles); // Statut 200 OK
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur (Internal Server Error)" });
        }
    }

    // GET /api/articles/:id
    static getArticleById(req, res) {
        try {
            const article = ArticleDAO.getById(req.params.id);
            if (!article) {
                return res.status(404).json({ message: "Article non trouvé (Not Found)" }); // Statut 404 Not Found
            }
            res.status(200).json(article); // Statut 200 OK
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }

    // POST /api/articles
    static createArticle(req, res) {
        try {
            const { title, content, author } = req.body;
            
            // Validation simple comme exigé par le TAF
            if (!title || title.trim() === "" || !author || author.trim() === "") {
                return res.status(400).json({ message: "Requête mal formée (Bad Request) : Le titre et l'auteur sont obligatoires." }); // Statut 400 Bad Request
            }
            
            const newArticle = ArticleDAO.create({ title, content, author });
            res.status(201).json(newArticle); // Statut 201 Created (Succès de création)
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }

    // PUT /api/articles/:id
    static updateArticle(req, res) {
        try {
            const { title, content, author } = req.body;
            
            // Validation minimale pour la mise à jour
            if (req.body.title && req.body.title.trim() === "") {
                return res.status(400).json({ message: "Requête mal formée (Bad Request) : Le titre ne peut pas être vide." });
            }
            
            const updatedArticle = ArticleDAO.update(req.params.id, req.body);
            if (!updatedArticle) {
                return res.status(404).json({ message: "Article non trouvé pour la mise à jour" }); // Statut 404 Not Found
            }
            res.status(200).json(updatedArticle); // Statut 200 OK
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }

    // DELETE /api/articles/:id
    static deleteArticle(req, res) {
        try {
            const isDeleted = ArticleDAO.deleteById(req.params.id);
            if (!isDeleted) {
                return res.status(404).json({ message: "Article non trouvé" }); // Statut 404 Not Found
            }
            res.status(200).json({ message: "Article supprimé avec succès" }); // Statut 200 OK
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
}

module.exports = ArticleController;
