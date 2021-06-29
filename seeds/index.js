const mongoose = require('mongoose');
const User = require('../models/userSchema');
const Payment = require('../models/paymentSchema');
const getRandomDate = require('./helpers/getRandomDate');
const nameData = require('./nameData');

mongoose.connect('mongodb://localhost:27017/coding_challenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const promises = [];
const seedDB = async () => {
  //removes everything from the db
  await User.deleteMany({});
  await Payment.deleteMany({});
  //Create 20 Users
  for (let i = 0; i < 20; i++) {
    const active = Math.random() < 0.9;
    const startDate = new Date(2012, 0, 1);
    const user = new User({
      active: active,
      signup_date: getRandomDate(startDate, new Date()),
      created: getRandomDate(startDate, new Date()),
      updated: getRandomDate(startDate, new Date()),
    });
    //Attach 3 payments per each user
    paymentSeed = async () => {
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * 10);
        const payment = new Payment({
          name: nameData[random],
          active: user.active,
          amount: Math.floor(Math.random() * 999) + 0.99,
          date: getRandomDate(user.created, new Date()),
          user: user._id,
          created: getRandomDate(user.created, new Date()),
          updated: getRandomDate(user.created, new Date()),
        });
        payment
          .save()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log('Payment Creation Error Occurred');
            console.log(err);
            console.log(err.errors.name.properties.message);
          });
      }
    };
    paymentSeed();
    await user
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log('User Creation Error Occurred');
        console.log(err);
        console.log(err.errors.name.properties.message);
      });
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log('connection closed');
});
