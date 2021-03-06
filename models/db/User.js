var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// SCHEMA FOR USER PROFILES
var UserSchema = new Schema({
  // firstName: a trimmed, required string
  firstName: {
    type: String,
    trim: true,
    required: "First Name is Required"
  },
  // lastName: a trimmed, required string
  lastName: {
    type: String,
    trim: true,
    required: "Last Name is Required"
  },
  // address: a trimmed, required string
  address: {
    type: String,
    trim: true,
    required: "Street address is Required"
  },
  // addressTwo: a trimmed string
  addressTwo: {
    type: String,
    trim: true,
  },
  // city: a trimmed, required string
  city: {
    type: String,
    trim: true,
    required: "City is Required"
  },
  // state: a trimmed, required string
  state: {
    type: String,
    trim: true,
    required: "State is Required"
  },
  // zip: 
  zip: {
    type: Number,
    required: "Zip code is required.",
    validate: [
      function(input) {
        return input.length = 5;
      },
      "Enter your 5-digit zip code."
    ]
  },
  // phone: a required 10-digit phone number
  phone: {
    type: Number,
    required: "Phone number is required.",
    validate: [
      function(input) {
        return input.length = 10;
      },
      "Enter your 10-digit phone number."
    ]
  },
  // email: a string that must match an email format and must be unique in the collection
  email: {
    type: String,
    unique: true,
    required: "Email is required.",
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  },
  // password: a trimmed, required string that must be more than 6 chars
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },

  // userCreated: the current date
  userCreated: {
    type: Date,
    default: Date.now
  },
  // lastUpdated: a date type entry
  lastUpdated: { type: Date },
  // fullName: a string type entry
  fullName: String,
  // savedSearches: an array containing user's questionnaire responses 
  // to dog/cat questionnaire (can store multiple of each)
  savedSearches: [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the UserSearch model
    ref: "UserSearch"
  }],
  // savedPets: an array containing pets user has chosen to save
  savedPets: [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Pet model
    ref: "Pet"
  }],
});

// Authentication: Hash creation 
UserSchema.pre('save', function saveUserHook(next) { 
  console.log('in pre user schema');
  const user = this;

  if(!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); } 

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      console.log('in bcrypt hash');
      if (hashError) { return next(hashError); } 
      
      user.password = hash;
      return next();
    });
  });
});


/* Custom Methods */

//Compare passed password with value in database. 
UserSchema.methods.comparePassword = function comparePassword(password, callback) { 
  bycrypt.compare(password, this.password, callback);
}



// Our getFullName method
UserSchema.methods.setFullName = function() {
  // Concatenate the user's first and last name, save it to this
  // Note: firstName and lastName have already been trimmed, so no need for extra string manipulation
  this.fullName = this.firstName + " " + this.lastName;
  // Return the full name
  return this.fullName;
};

// Our lastUpdatedDate method
UserSchema.methods.lastUpdatedDate = function() {
  // Make lastUpdatedDate the current date
  this.lastUpdated = Date.now();
  // Return this new date
  return this.lastUpdated;
};

// Use the above schema to make the User model
var User = mongoose.model("User", UserSchema);

// Export the model so the server can use it
module.exports = User;


