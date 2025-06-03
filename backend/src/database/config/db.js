require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  storage: "./test/db.sqlite",
  operatorAliases: false,
  logging: false,
  pool: {
    acquire: 60000,
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   }
  // },
};
