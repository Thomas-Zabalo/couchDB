const nano = require('nano')(process.env.COUCHDB_URL || `http://localhost:5984`);
const db = nano.db.use(process.env.DBNAME);

module.exports = {
    async getAllBooks() {
        try {
            const response = await db.list({ include_docs: true });
            return response.rows.map(row => ({ id: row.id, ...row.doc }));
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de tous les livres: ${error.message}`);
        }
    },

    async getBookById(id) {
        try {
            const response = await db.get(id);
            return response;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du livre: ${error.message}`);
        }
    },

    async addBook(bookData) {
        try {
            const response = await db.insert(bookData);
            return { id: response.id, ...bookData };
        } catch (error) {
            throw new Error(`Erreur lors de l'ajout du livre: ${error.message}`);
        }
    },

    async updateBook(id, bookData) {
        try {
            const existing = await db.get(id);
            const updated = { ...existing, ...bookData };
            const response = await db.insert(updated);
            return response;
        } catch (error) {
            throw new Error(`Erreur lors de la modification du livre: ${error.message}`);
        }
    },

    async deleteBook(id) {
        try {
            const existingBook = await db.get(id);
            if (!existingBook) {
                return null;
            }
            const response = await db.destroy(id, existingBook._rev);
            return response;
        } catch (error) {
            throw new Error(`Erreur lors de la suppression du livre: ${error.message}`);
        }
    }
};
