require("dotenv").config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    storage: process.env.DB_URL,
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};