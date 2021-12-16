const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://amanda:1234@cluster0-shard-00-00.vtc0g.mongodb.net:27017,cluster0-shard-00-01.vtc0g.mongodb.net:27017,cluster0-shard-00-02.vtc0g.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13rmoj-shard-0&authSource=admin&retryWrites=true&w=majority"

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Banco conectado (:");
  } catch (e) {
    console.log("Error: ", e.message);
  }
};
module.exports = {
  connect,
};