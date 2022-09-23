const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const LoginSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required : [true, "{PATH} is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
    validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      },
  }, {timestamps: true});

  // add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
  console.log(this.password)
  console.log(this.get('confirmPassword'))
  if (this.password !== this.get('confirmPassword')){
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

// near the top is a good place to group our imports
const bcrypt = require('bcrypt');
// this should go after 
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});