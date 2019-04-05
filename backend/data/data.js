var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  name: { type: String,  required: true, trim: true},
  email: { type: String, unique: true,  required: true, trim: true},
  age: {  type: Number,required: true},
  phone: {  type: String, required: true, trim: true  },
  password: {  type: String, required: true},
  role: {type: Number, required: true}
});

UserSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

UserSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('DoctorPatient', UserSchema);
