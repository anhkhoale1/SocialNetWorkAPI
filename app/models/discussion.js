const {mongoose, Schema} = require('mongoose');
const UserSchema = require('../models/user');
const GroupSchema = require('../models/group');
const EventSchema = require('../models/event');

const DiscussionSchema = new mongoose.Schema({
  where : {
    type : [ GroupSchema || EventSchema ],
    required: true
  },
  messages: {
    type : [ UserSchema ]
  },
  attendee: {
    type : [ UserSchema ]
  },
  admin : {
    type : [ UserSchema ]
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