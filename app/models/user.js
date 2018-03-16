
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true }
});

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    user.password = hash;
  })
  next();
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// var User =  mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);