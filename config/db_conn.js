const mongoose = require("mongoose");

const connect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://admin:1234@employee-a5x6h.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      }
    );
    console.log(`MongoDB is up @ MongoAtlas :${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connect;
