const bookModel = require("../models/bookModel");
const Joi = require('joi');

const bookSchema = Joi.object({
    titre: Joi.string()
        .min(2)
        .max(30)
        .required(),

    auteur: Joi.string()
        .min(2)
        .max(30)
        .required(),

    description: Joi.string()
        .min(10)
        .max(100)
        .optional(),

    annee_de_publication: Joi.number()
        .min(0)
        .max(3000)
        .required(),
})

module.exports = {

    async getAllBooks(req, res) {
        try {
            const books = await bookModel.getAllBooks();
            res.json(books);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getBookById(req, res) {
        try {
            const book = await bookModel.getBookById(req.params.id);
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ message: "Aucun livre trouvé" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async addBook(req, res) {
        // Validation avec Joi
        const { error, value } = bookSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: "Données invalides", details: error.details });
        }

        try {
            const result = await bookModel.addBook(value);
            res.status(201).json({ message: "Livre ajouté avec succès", result });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    async updateBook(req, res) {

        // Validation des données avec Joi
        const { error, value } = bookSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Données invalides", details: error.details });
        }

        try {
            const updatedBook = await bookModel.updateBook(req.params.id, value);
            if (!updatedBook) {
                return res.status(404).json({ message: "Livre introuvable ou aucune modification détectée" });
            }
            res.status(200).json({ message: "Livre mis à jour avec succès", updatedBook });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    async deleteBook(req, res) {
        try {
            const book = await bookModel.deleteBook(req.params.id);

            if (!book) {
                return res.status(404).json({ message: "Livre introuvable ou déjà supprimé" });
            }
            res.status(200).json({ message: "Livre supprimé avec succès" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}