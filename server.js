// server.js
const express = require('express');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Définition de la route de base pour les articles
app.use('/api/articles', articleRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré avec succès sur le port ${PORT}`);
});
