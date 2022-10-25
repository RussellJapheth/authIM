const { Permission, Group } = require("../models");

class Groups {
    /**
     * It creates a new group
     * @param {Object} data - The data of the group.
     * @param {String} data.groupName - The name of the group.
     * @param {String} data.description - An optional description of the group.
     * @returns {Group} The group object
     * @throws {SequelizeUniqueConstraintError}
     * @throws {ValidationError}
     */
    static async create(data = { groupName, description: "" }) {
        return Group.create({
            name: groupName,
            description: description,
        });
    }

    /**
     * It update an existing group
     * @param {Object} data - The data of the group.
     * @param {String} data.groupName - The name of the group.
     * @param {String} data.description - An optional description of the group.
     * @returns {Group} The group object
     * @throws {SequelizeUniqueConstraintError}
     * @throws {ValidationError}
     */
    static async update(data = { id, groupName, description: "" }) {
        let group = await Group.findOne({
            where: {
                id,
            },
        });

        if (group === null) {
            throw new Error("Group not foumd");
        }

        if (groupName !== null) {
            group.name = groupName;
        }

        if (description !== null) {
            group.description = description;
        }

        group.save({ fields: ["name", "description"] });
        group.reload();
        return group;
    }

    /**
     * Find all groups
     * @returns {Array.<Group>} An array of groups
     */
    static async findAll() {
        return await Group.findAll();
    }

    /**
     * Find a group by id
     * @param {Number} id - The id of the group.
     * @returns {Group} The group object
     */
    static async findById(id) {
        return await Group.findOne({
            where: {
                id,
            },
        });
    }

    /**
     * Find a group by the name of the group
     * @param {String} groupName - The name of the group.
     * @returns {Group} The group object
     */
    static async findByName(groupName) {
        return await Group.findOne({
            where: {
                name: groupName,
            },
        });
    }

    /**
     * Add a permission to a group
     * @param {Number} groupId - The id of the group.
     * @param {Number} permissionId - The id of the permission.
     * @returns {Group} The group object
     * @throws {Error} Group not found
     * @throws {Error} Permission not found
     */
    static async addPermissionById(groupId, permissionId) {
        let group = await Groups.findById(groupId);
        if (group === null) {
            throw new Error("Group not found");
        }

        let permission = await Permission.findOne({
            where: { id: permissionId },
        });
        if (permission === null) {
            throw new Error("Permission not found");
        }

        group.addPermission(permission);
        return group;
    }

    /**
     * Remove a permission from a group
     * @param {Number} groupId - The id of the group.
     * @param {Number} permissionId - The id of the permission.
     * @returns {Group} The group object
     * @throws {Error} Group not found
     * @throws {Error} Permission not found
     */
    static async removePermission(groupId, permissionId) {
        let group = await Groups.findById(groupId);
        if (group === null) {
            throw new Error("Group not found");
        }

        let permission = await Permission.findOne({
            where: { id: permissionId },
        });
        if (permission === null) {
            throw new Error("Permission not found");
        }

        group.removePermission(permission);
        return group;
    }

    /**
     * Delete a group by id
     * @param {Number} id - The id of the group.
     * @returns {Boolean}
     */
    static async delete(id) {
        return await Group.destory({
            where: {
                id,
            },
        });
    }
}

module.exports = Groups;
