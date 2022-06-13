const crypto = require('crypto');

const geraToken = () => crypto.randomBytes(8).toString('hex');

module.exports = geraToken;
