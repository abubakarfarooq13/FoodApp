const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://abubakarfarooq13:@merncluster.28nfvuv.mongodb.net/GoFood?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(mongoURI, async (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Connected Successfully");
      const fetched_data = await mongoose.connection.db.collection(
        "food_items"
      );
      fetched_data.find({}).toArray(function (err, data) {
        if (err) console.log(err);
        else console.log();
      });
    }
  });
};

module.exports = mongoDB;
