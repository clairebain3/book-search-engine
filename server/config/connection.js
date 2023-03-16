const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
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

console.log(process.env.MONGODB_URI)
module.exports = mongoose.connection;
