const mongoose = require('mongoose');
const app = require('./app')

const connection = mongoose.connect(
  "mongodb+srv://CrazyReLoad:CrazyReLoad@cluster0.tifom.mongodb.net/?retryWrites=true&w=majority",
  {
    dbName: "contacts",
  }
);
connection
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log('Server not running.Error message:${err.message}');
    process.exit(1);
  });


