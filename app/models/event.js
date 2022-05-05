const {mongoose, Schema} = require('mongoose');
const UserSchema = require('../models/user');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  confidentiel: {
    type: Boolean, // 1 = public, 0 = private
    default: true
  },
  description: String,
  startDate: {
    type: Date,
    default: Date.now,
    get: startDateVal => moment(startDateVal).format('MMM DD, YYYY [at] hh:mm:a')
  },
  endDate: {
    type: Date,
    default: Date.now,
    get: endDateVal => moment(endDateVal).format('MMM DD, YYYY [at] hh:mm:a')
  },
  lieu: String,
  photoProfil: String,
  users: [{
    type: Object,
  }],
 },
{
  collection: 'events',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id
  }
});

module.exports = EventSchema;