const { default: mongoose } = require("mongoose");

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connection successfull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { dbConfig };
