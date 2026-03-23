// models/articleModel.js

// Base de données simulée en mémoire
let articles = [];

class ArticleDAO {
    // Récupérer tous les articles
    static getAll() {
        return articles;
    }
    
    // Récupérer un article par ID
    static getById(id) {
        return articles.find(a => a.id === parseInt(id));
    }
    
    // Créer un nouvel article
    static create(articleData) {
        const newArticle = {
            id: Date.now(), // Génère un ID unique basé sur le temps
            title: articleData.title,
            content: articleData.content || "",
            author: articleData.author,
            createdAt: new Date().toISOString()
        };
        articles.push(newArticle);
        return newArticle;
    }
    
    // Mettre à jour un article
    static update(id, updatedData) {
        const index = articles.findIndex(a => a.id === parseInt(id));
        if (index === -1) return null; // Retourne null si pas trouvé
        
        // Fusionne les données existantes avec les nouvelles
        articles[index] = { ...articles[index], ...updatedData };
        return articles[index];
    }
    
    // Supprimer un article
    static deleteById(id) {
        const index = articles.findIndex(a => a.id === parseInt(id));
        if (index === -1) return false; // Retourne false si pas trouvé
        
        articles.splice(index, 1); // Supprime l'article du tableau
        return true;
    }
}

module.exports = ArticleDAO;
