const { Permission } = require("../models");

class Permissions {
    /**
     * It creates a new permission
     * @param {Object} data - The data of the permission.
     * @param {String} data.permissionName - The name of the permission.
     * @param {String} data.description - An optional description of the permission.
     * @returns {Permission} The permission object
     * @throws {SequelizeUniqueConstraintError}
     * @throws {ValidationError}
     */
    static async create(data = { permissionName, description: "" }) {
        return Permission.create({
            name: permissionName,
            description: description,
        });
    }

    /**
     * It update an existing Permission
     * @param {Object} data - The data of the permission.
     * @param {String} data.permissionName - The name of the permission.
     * @param {String} data.description - An optional description of the permission.
     * @returns {Permission} The permission object
     * @throws {SequelizeUniqueConstraintError}
     * @throws {ValidationError}
     */
    static async update(data = { id, permissionName, description: "" }) {
        let permission = await Permission.findOne({
            where: {
                id,
            },
        });

        if (permission === null) {
            throw new Error("Group not foumd");
        }

        if (permissionName !== null) {
            permission.name = permissionName;
        }

        if (description !== null) {
            permission.description = description;
        }

        permission.save({ fields: ["name", "description"] });
        permission.reload();
        return permission;
    }

    /**
     * Find all permissions
     * @returns {Array.<Permission>} An array of permissions
     */
    static async findAll() {
        return await Permission.findAll();
    }

    /**
     * Find a permission by id
     * @param {Number} id - The id of the permission.
     * @returns {Permission} The permission object
     */
    static async findById(id) {
        return await Permission.findOne({
            where: {
                id,
            },
        });
    }

    /**
     * Find a permission by the name of the permission
     * @param {String} permissionName - The name of the permission.
     * @returns {Permission} The permission object
     */
    static async findByName(permissionName) {
        return await Permission.findOne({
            where: {
                name: permissionName,
            },
        });
    }
    static async getAllGroups(permissionId) {
        let permission = await Permission.findOne({
            where: {
                id: permissionId,
            },
        });
        return await permission.getGroups();
    }
    static async getAllUsers(permissionId) {
        let permission = await Permission.findOne({
            where: {
                id: permissionId,
            },
        });
        return await permission.getUsers();
    }
    static async getAllRoles(permissionId) {
        let permission = await Permission.findOne({
            where: {
                id: permissionId,
            },
        });
        return await permission.getRoles();
    }
    /**
     * Delete a permission by id
     * @param {Number} id - The id of the permission.
     * @returns {Boolean}
     */
    static async delete(id) {
        return await Permission.destory({
            where: {
                id,
            },
        });
    }
}

module.exports = Permissions;
