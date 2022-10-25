const sequelize = require("../config/database");
const models = require("../models");
/*
 * The AuthIM class is a singleton that initializes the database and returns an instance of itself
 */
class AuthIM {
    constructor() {}

    static async init() {
        await sequelize.sync();
        return new AuthIM();
    }
}

module.exports = AuthIM;
