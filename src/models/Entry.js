import mongoose from 'mongoose';

/* EntrySchema will correspond to a collection in your MongoDB database. */
const EntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  years: {
    type: Number,
    required: true
  },
  positions: {
    type: [String],
    required: true
  },
  resumé: {
    type: String,
    required: true
  },
  whatMakesYouIdeal: {
    type: String,
    required: true
  },
  queries: {
    type: String
  }
});

export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema);