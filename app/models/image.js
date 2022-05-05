const {mongoose, Schema} = require('mongoose');

const imageSchema = new mongoose.Schema({
  path : {
    type: String,
    required: true
  },
 },
{
  collection: 'images',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id
  }
});

module.exports = imageSchema;