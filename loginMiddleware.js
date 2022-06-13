const crypto = require('crypto');

const geraToken = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    // ideia retirada do site: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const testEmail = /\S+@\S+\.\S+/;
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!testEmail.test(email)) {
        return res.status(400).json(
            { message: 'O "email" deve ter o formato "email@email.com"' },
        );
    }
    next();
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (password.length < 6) {
        return res.status(400).json(
            { message: 'O "password" deve ter pelo menos 6 caracteres' },
        );
    }
    next();
};

module.exports = { 
    geraToken,
    validateEmail,
    validatePassword,
};
