const Sequelize = require("sequelize");

if (process.env.NODE_ENV === "testing") {
    module.exports = new Sequelize("sqlite::memory:");
} else {
    module.exports = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD,
        {
            dialect: "mariadb",
        }
    );
}
