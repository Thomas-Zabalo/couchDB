const nano = require('nano')(`http://thomas:Voiture82@localhost:5984`);
const dbName = 'livres';
const db = nano.use(dbName);

module.exports = {

    async getAllBooks() {
        const response = await db.list({ include_docs: true });
        return response.rows.map(row => ({ id: row.id, ...row.doc }));
    },

    async getBookById(id) {

    },

    async addBook(req, res) {

    },

    async updateBook(req, res) {

    },

    async deleteBook(req, res) {

    }

}
