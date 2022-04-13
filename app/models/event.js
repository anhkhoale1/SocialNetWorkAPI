const {mongoose, Schema} = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
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
  confidentiel: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
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