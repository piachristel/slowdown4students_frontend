
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create movie schema
var userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

var user = mongoose.model('user', userSchema);


module.exports = user;