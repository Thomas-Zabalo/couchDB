const SECRET_KEY = process.env.SECRET_KEY || 'votre_cle_secrete';
const jwt = require('jsonwebtoken');

function Authmiddleware(req, res, next) {
    const token = req.query.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ status: false, message: 'Token absent' })
    }
    try {
        const verify = jwt.verify(token, SECRET_KEY)
        user = verify.name
        next();
    } catch (error) {
        return res.status(403).json({ status: false, message: 'Token incorrect' });
    }
}

module.exports = Authmiddleware