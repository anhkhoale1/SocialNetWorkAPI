const {mongoose, Schema} = require('mongoose');
const UserSchema = require('../models/user');

const GroupSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  description : String,
  users: {
    type: [ UserSchema ],
    required: true
  },
  admin: {
    type : [ UserSchema ],
    required: true
  }
 },
{
  collection: 'groups',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id
  }
});

module.exports = GroupSchema;