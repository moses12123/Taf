# Taf
Ce code est consacree au developpement d'une API Backend pour la gestion d'un blog, avec presentation de l'architecture, du code source complet et de la documentation
class ArticleModel {
  constructor() {
    this.articles = [];
    this.nextId = 1;
  }

  create(articleData) {
    const article = {
      id: this.nextId++,
      titre: articleData.titre,
      contenu: articleData.contenu,
      auteur: articleData.auteur,
      date: articleData.date || new Date().toISOString().split('T')[0],
      categorie: articleData.categorie,
      tags: articleData.tags || []
    };
    this.articles.push(article);
    return article;
  }

  findAll(filters = {}) {
    let result = [...this.articles];

    if (filters.categorie) {
      result = result.filter(a => a.categorie === filters.categorie);
    }
    if (filters.date) {
      result = result.filter(a => a.date === filters.date);
    }
    if (filters.auteur) {
      result = result.filter(a => a.auteur === filters.auteur);
    }

    return result;
  }

  findById(id) {
    return this.articles.find(a => a.id === parseInt(id));
  }

  update(id, articleData) {
    const index = this.articles.findIndex(a => a.id === parseInt(id));
    if (index === -1) return null;

    this.articles[index] = {
      ...this.articles[index],
      ...articleData,
      id: this.articles[index].id
    };

    return this.articles[index];
  }

  delete(id) {
    const index = this.articles.findIndex(a => a.id === parseInt(id));
    if (index === -1) return false;

    this.articles.splice(index, 1);
    return true;
  }
}

module.exports = new ArticleModel();