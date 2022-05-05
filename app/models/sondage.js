const {mongoose, Schema} = require('mongoose');
const EventModel = require('../models/event');

const ReponseSchema = new mongoose.Schema({
  reponse : {
    type : String,
    required: true
  }
 },
{
  collection: 'sondages',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id
  }
}); 

const QuestionSchema = new mongoose.Schema({
  question : {
    type : String,
    required: true
  },
  reponse : {
    type : [ ReponseSchema ],
    required: true
  }
 },
{
  collection: 'sondages',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id
  }
}); 

const SondageSchema = new mongoose.Schema({
  event : {
    type : [ EventModel ],
    required: true
  },
  question : {
    type : [ QuestionSchema ],
    required : true
  }
 },
{
  collection: 'sondages',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id
  }
});

module.exports = SondageSchema;