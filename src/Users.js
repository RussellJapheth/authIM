const { User } = require("../models");
const bcrypt = require("bcryptjs");

class Users {
    /**
     * It creates a new user
     * @param {Object} data - The data of the user.
     * @param {String} data.email - The email address of the user.
     * @param {String} data.password - The password that the user entered.
     * @param {String} data.username - The username of the user.
     * @returns {User} The user object
     * @throws {SequelizeUniqueConstraintError}
     * @throws {ValidationError}
     */
    static async create(data = { email, password, username }) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        return await User.create({
            email: data.email,
            password: data.password,
            username: data.username,
        });
    }

    /**
     * It updates an existing user
     * @param {Object} data - The data of the user.
     * @param {String} data.id - The id of the user.
     * @param {String} data.email - The email address of the user.
     * @param {String} data.password - The password that the user entered.
     * @param {String} data.username - The username of the user.
     * @returns {User} The user object
     * @throws {SequelizeUniqueConstraintError}
     * @throws {ValidationError}
     * @throws {Error} User was not found
     */
    static async update(
        data = { id, email: null, password: null, username: null }
    ) {
        let user = await User.findOne({
            where: {
                id: data.id,
            },
        });

        if (user === null) {
            throw new Error("User not foumd");
        }

        if (data.email) {
            user.email = data.email;
        }

        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
            user.password = data.password;
        }

        if (data.username) {
            user.username = data.username;
        }

        user.save({ fields: ["email", "password", "username"] });
        user.reload();
        return user;
    }

    /**
     * Attempt signin
     * @param {Object} data - The data of the user.
     * @param {String} email - The email address of the user.
     * @param {String} username - The username of the user.
     * @returns {User|Boolean} The user or false on failure
     */
    static async login(email, password) {
        let user = await User.findOne({
            where: {
                email,
            },
        });
        if (user === null) {
            return false;
        }
        // check if password id valid
        const validPassword = await bcrypt.compare(password, user.password);

        return validPassword ? user : false;
    }

    /**
     * Find all users
     * @returns {Array.<User>} An array of users
     */
    static async findAll() {
        return await User.findAll();
    }

    /**
     * Find a user by id
     * @param {Number} id - The id of the user.
     * @returns {User} The user object
     */
    static async findById(id) {
        return await User.findOne({
            where: {
                id,
            },
        });
    }

    /**
     * Find a user by username
     * @param {String} username - The username of the user.
     * @returns {User} The user object
     */
    static async findByUsername(username) {
        return await User.findOne({
            where: {
                username,
            },
        });
    }

    /**
     * Delete a user by id
     * @param {Number} id - The id of the user.
     * @returns {Boolean}
     */
    static async delete(id) {
        return await User.destory({
            where: {
                id,
            },
        });
    }
}

module.exports = Users;
