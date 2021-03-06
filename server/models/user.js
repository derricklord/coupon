var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  facebook: String,
  google: String,
  isAdmin: Boolean,
  isVendor: Boolean,
  role: String,
  roleVerified: Boolean,
  address: {
        street: String,
        city: String,
        state: String,
        postalCode: String
  },
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2dsphere'      // create the geospatial index
  }    
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);