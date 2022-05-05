const {mongoose, Schema} = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  description : String,
  users: {
    type: Object,
    required: true
  },
  admin: {
    type: Object,
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