const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  // process.env.MONGODB_URI ||   
  // 'mongodb+srv://clairebain3:mypassword@cluster0.lv5w54x.mongodb.net/googlebook?retryWrites=true&w=majority'
useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(()=>{
  console.log("mongodb is connected");
}).catch((error)=>{
  console.log("mondb not connected");
  console.log(error);
});

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://clairebain3:mypassword>@cluster0.lv5w54x.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

console.log(process.env.MONGODB_URI)

module.exports = mongoose.connection;
