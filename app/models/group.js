const {mongoose, Schema} = require('mongoose');

const GroupSchema = new mongoose.Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  admin: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
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