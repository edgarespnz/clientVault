const bcrypt = require('bcrypt');

async function comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    comparePasswords
}