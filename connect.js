const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb://aryan:aryan264@cluster0-shard-00-00.gn5f7.mongodb.net:27017,cluster0-shard-00-01.gn5f7.mongodb.net:27017,cluster0-shard-00-02.gn5f7.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-z3rbe1-shard-0&readPreference=primary&ssl=true',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connect;
