const {mongoose, Schema} = require('mongoose');
const UserSchema = require('../models/user');
const GroupSchema = require('../models/group');
const EventSchema = require('../models/event');

const DiscussionSchema = new mongoose.Schema({
  name : {
    type: String
  },
  where : {
    type : Object,
    required: true
  },
  messages: [{
    type : String,
  }],
  attendee: {
    type : Object
  },
  admin : {
    type : Object
  }
 },
{
  collection: 'discussions',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id
  }
});

module.exports = DiscussionSchema;