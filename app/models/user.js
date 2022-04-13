const {mongoose, Schema} = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  city: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/]
  },
  group: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
},
{
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id
  }
})

module.exports = UserSchema;