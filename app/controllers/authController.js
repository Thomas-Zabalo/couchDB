const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'votre_cle_secrete';

module.exports = {
   
    async getToken(req, res) {
        const user = req.query.user;
        if (!user) {
            return res.status(400).json({ error: 'Paramètre user manquant' });
        }
        const payload = { name: user };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '4h' });

        res.json({ jeton: token });
    },

    async verifyToken(req, res) {
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({ error: 'Token manquant' });
        }
        try {
            const verify = jwt.verify(token, SECRET_KEY);
            res.json({ status: true, name: verify.name });
        } catch (error) {
            res.status(401).json({ status: false, message: 'Token incorrect' });
        }
    },

    async restricted(req, res) {
        res.json({ status: true, message: `Le user ${req.name} est bien autorisé` });
    },

    async restrictedAdmin(req, res) {
        if (req.name === 'admin') {
            res.json({ status: true, message: 'Le user est bien admin' });
        } else {
            res.status(403).json({ status: false, message: `Le user ${req.name} n'est pas admin` });
        }
    },

}

