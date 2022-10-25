const { User, Role, Permission } = require("../models");

class Roles {
    /**
     * It creates a new role
     * @param {Object} data - The data of the role.
     * @param {String} data.roleName - The name of the role.
     * @param {String} data.description - An optional description of the role.
     * @returns {Role} The role object
     * @throws {SequelizeUniqueConstraintError}
     * @throws {ValidationError}
     */
    static async create(data = { roleName, description: "" }) {
        return Role.create({
            name: data.roleName,
            description: data.description,
        });
    }

    /**
     * It update an existing Role
     * @param {Object} data - The data of the role.
     * @param {String} data.roleName - The name of the role.
     * @param {String} data.description - An optional description of the role.
     * @returns {Role} The role object
     * @throws {SequelizeUniqueConstraintError}
     * @throws {ValidationError}
     */
    static async update(data = { id, roleName, description: "" }) {
        let role = await Role.findOne({
            where: {
                id,
            },
        });

        if (role === null) {
            throw new Error("Group not foumd");
        }

        if (data.roleName) {
            role.name = data.roleName;
        }

        if (data.description) {
            role.description = data.description;
        }

        role.save({ fields: ["name", "description"] });
        role.reload();
        return role;
    }

    /**
     * Find all roles
     * @returns {Array.<Role>} An array of roles
     */
    static async findAll() {
        return await Role.findAll();
    }

    /**
     * Find a role by id
     * @param {Number} id - The id of the role.
     * @returns {Role} The role object
     */
    static async findById(id) {
        return await Role.findOne({
            where: {
                id,
            },
        });
    }

    /**
     * Find a role by the name of the role
     * @param {String} roleName - The name of the role.
     * @returns {Role} The role object
     */
    static async findByName(roleName) {
        return await Role.findOne({
            where: {
                name: roleName,
            },
        });
    }

    /**
     * Add a permission to a role
     * @param {Number} roleId - The id of the role.
     * @param {Number} permissionId - The id of the permission.
     * @returns {Role} The role object
     * @throws {Error} Role not found
     * @throws {Error} Permission not found
     */
    static async addPermissionById(roleId, permissionId) {
        let role = await this.findById(roleId);
        if (role === null) {
            throw new Error("Role not found");
        }

        let permission = await Permission.findOne({
            where: { id: permissionId },
        });
        if (permission === null) {
            throw new Error("Permission not found");
        }

        role.addPermission(permission);
        return role;
    }

    /**
     * Remove a permission from a role
     * @param {Number} roleId - The id of the role.
     * @param {Number} permissionId - The id of the permission.
     * @returns {Role} The role object
     * @throws {Error} Role not found
     * @throws {Error} Permission not found
     */
    static async removePermission(roleId, permissionId) {
        let role = await this.findById(roleId);
        if (role === null) {
            throw new Error("Role not found");
        }

        let permission = await Permission.findOne({
            where: { id: permissionId },
        });
        if (permission === null) {
            throw new Error("Permission not found");
        }

        role.removePermission(permission);
        return role;
    }

    /**
     * Add a user to a role
     * @param {Number} roleId - The id of the role.
     * @param {Number} userId - The id of the user.
     * @returns {Role} The role object
     * @throws {Error} Role not found
     * @throws {Error} User not found
     */
    static async addUserById(roleId, userId) {
        let role = await this.findById(roleId);
        if (role === null) {
            throw new Error("Role not found");
        }

        let user = await User.findOne({
            where: { id: userId },
        });
        if (user === null) {
            throw new Error("User not found");
        }

        role.addUser(user);
        return role;
    }

    /**
     * Remove a user from a role
     * @param {Number} roleId - The id of the role.
     * @param {Number} userId - The id of the user.
     * @returns {Role} The role object
     * @throws {Error} Role not found
     * @throws {Error} User not found
     */
    static async removeUser(roleId, userId) {
        let role = await this.findById(roleId);
        if (role === null) {
            throw new Error("Role not found");
        }

        let user = await User.findOne({
            where: { id: userId },
        });
        if (user === null) {
            throw new Error("User not found");
        }

        role.removeUser(user);
        return role;
    }

    /**
     * Delete a role by id
     * @param {Number} id - The id of the role.
     * @returns {Boolean}
     */
    static async delete(id) {
        return await Role.destory({
            where: {
                id,
            },
        });
    }
}

module.exports = Roles;
