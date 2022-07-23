const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const db = await connect(process.env.MONGO_DB_URI);
    console.log(
      `mongoDB connected ,name: ${db.connection.name},host:${db.connection.host}, port:${db.connection.port}`
        .cyan.underline
    );
  } catch (error) {
    console.log(error.message.red);
    process.exit(1);
  }
};

module.exports = connectDB;
