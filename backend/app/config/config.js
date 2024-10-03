const crypto = require('crypto');

const config = {
    jwtSecret: crypto.randomBytes(16).toString('hex')
}

module.exports = config