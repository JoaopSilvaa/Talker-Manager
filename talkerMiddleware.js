const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
        return res.status(400).json(
            { message: 'O "name" deve ter pelo menos 3 caracteres' },
        );
    }
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (age < 18) {
        return res.status(400).json(
            { message: 'A pessoa palestrante deve ser maior de idade' },
        );
    }
    next();
};

const validateWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    // trecho inspirado no exercicio 2 do dia 5 do bloco 22
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (!watchedAt) res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    if (!dateRegex.test(watchedAt)) {
        return res.status(400).json(
            { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
        );
    }
    next();
};

const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate === undefined) {
        return res.status(400).json(
            { message: 'O campo "rate" é obrigatório' },
        );
    }
    
    if (!(rate >= 1 && rate <= 5)) {
        return res.status(400).json(
            {
                message: 'O campo "rate" deve ser um inteiro de 1 à 5',
            },
            );
        }
    next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    next();
};

module.exports = {
    validateName,
    validateAge,
    validateTalk,
    validateRate,
    validateWatchedAt,
};