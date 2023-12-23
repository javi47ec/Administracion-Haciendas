const mongoose = required("mongoose");

const DB_URI = "mongodb://localhost:27017/myHacienda";
s
module.exports = () => {
  const connect = () => {
    mongoose.connect(
      DB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.log("DB: ERROR !!");
        } else {
          console.log("Conexión Exitosa");
        }
      }
    );
  };

  connect();
};
