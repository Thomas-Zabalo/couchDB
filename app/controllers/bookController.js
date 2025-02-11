const bookModel = require("../models/bookModel");

module.exports = {

    async getAllBooks(req, res) {
        console.log(res)
        try {
            const books = await bookModel.getAllBooks();
            res.json(books);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getBookById(req, res) {
        try {
            const id = req.params.id
            const book = await bookModel.getBookById(id);
            res.json(book);
            if (!book) { res.status(404).json({ message: "Aucun livre trouvé" }) }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async addBook(req, res) {
        try {
            const book = await bookModel.addBook();
            res.json(book);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateBook(req, res) {
        try {
            const book = await bookModel.updateBook();
            res.json(book);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async deleteBook(req, res) {
        try {
            const book = await bookModel.deleteBook();
            res.json(book);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}