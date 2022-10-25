const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");

const User = sequelize.define("user", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

const Group = sequelize.define(
    "group",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: false,
        },
    },
    {
        timestamps: false,
    }
);

const Role = sequelize.define(
    "role",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: false,
        },
    },
    {
        timestamps: false,
    }
);

const Permission = sequelize.define(
    "permission",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: false,
        },
    },
    {
        timestamps: false,
    }
);

Role.belongsToMany(User, { through: "user_roles" });
User.belongsToMany(Role, { through: "user_roles" });

Permission.belongsToMany(User, { through: "user_permissions" });
User.belongsToMany(Permission, { through: "user_permissions" });

Permission.belongsToMany(Role, { through: "role_permissions" });
Role.belongsToMany(Permission, { through: "role_permissions" });

Permission.belongsToMany(Group, { through: "group_permissions" });
Group.belongsToMany(Permission, { through: "group_permissions" });

User.belongsToMany(Group, { through: "user_groups" });
Group.belongsToMany(User, { through: "user_groups" });

module.exports = {
    User,
    Role,
    Permission,
    Group,
};
