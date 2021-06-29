/*
 * Put the correct implementation of incorrect.js here.
 */

var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
const User = require('./models/userSchema');
const Payment = require('./models/paymentSchema');

mongoose.connect('mongodb://localhost:27017/clerkie_challenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

/*
 * Pulls the first user from the user id list that can be found in the database.
 * If a particular user can't be found, ignore the id and look for the next user
 * until one can be found.
 */
async function pullFirstUser(userIds) {
  let foundUsers = {};
  let result = undefined;

  var promises = await User.find(
    { _id: { $in: userIds } },
    (err, results) => {
      results.forEach((element) => {
        if (!foundUsers[element]) {
          foundUsers[element._id] = element;
        }
      });
    },
  );
  Promise.all(promises)
    .then(() => {
      for (id of userIds) {
        if (foundUsers[id]) {
          result = foundUsers[id];
          break;
        }
      }
      return result;
    })
    .catch((err) => console.log(err));
}
module.exports.pullFirstUser = pullFirstUser;

/*
 * Processes the sorted array and returns the results in
 * the same order as the input documents (e.g., the
 * result of the first element in the argument array should
 * be stored in the first element of the result array, and so on...).
 */
async function pullPaymentsForUsers(users) {
  let finalResults = [];
  //build a map to store the index references
  const map = {};
  for (let user = 0; user < users.length; user++) {
    if (!map[sampleUsers[user]._id]) {
      map[sampleUsers[user]._id] = user;
    }
  }
  //search for all the users then sort them
  var promises = await Payment.find(
    { user: { $in: users } },
    (err, results) => {
      results.forEach((element) => {
        let index = map[element.user];
        if (finalResults[index]) {
          finalResults[index].push(element);
        } else {
          finalResults[index] = [element];
        }
      });
    },
  );
  Promise.all(promises)
    .then(() => {
      return finalResults;
    })
    .catch((err) => console.log(err));
}
module.exports.pullPaymentsForUsers = pullPaymentsForUsers;

/*
 * Converts the number to a string (return nothing if
 * something other than a number is passed to the function)
 */
function convertToStr(num) {
  if (typeof num === 'number') return num.toString();
}
module.exports.convertToStr = convertToStr;

/*
 * Given the _id of the payment, return the payment
 * with the associated user. The user should be stored
 * as "user" on the payment object.
 *
 * Sometimes the payment id might not match a payment.
 */
async function getPaymentWithUser(paymentId) {
  let paymentWithUser = await Payment.find({
    _id: paymentId,
  })
    .populate('user')
    .catch((err) => console.log(err));
  return paymentWithUser;
}
module.exports.getPaymentWithUser = getPaymentWithUser;

/*
 * Pulls all active payments for the users and returns an object
 * mapping the user id to the user's payments (string to array).
 * Note: userIds is passed in as an array of strings
 */
async function getGroupedUserPmts(userIds) {
  let result = {};
  var promises = await Payment.find(
    { user: { $in: userIds } },
    (err, results) => {
      results.forEach((element) => {
        if (element.active) {
          if (result[element.user]) {
            result[element.user].push(element);
          } else {
            result[element.user] = [element];
          }
        }
      });
    },
  );
  Promise.all(promises)
    .then(() => {
      return result;
    })
    .catch((err) => console.log(error));
}
module.exports.getGroupedUserPmts = getGroupedUserPmts;
