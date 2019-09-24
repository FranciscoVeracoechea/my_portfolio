import mongoose, { Schema } from 'mongoose';

// Jim Rohn
//   Formal education will make you a living. Self-education will make you a fortune.
// RALPH JOHNSON
//   Before a software can be reusable, it must first be usable.
// Michael Hartung
//   Hardware eventually fails. Software eventually works.
// Waseem Latif
//  Programming is not easy like Sunday morning, it is silent poetry.


const CiteSchema = new Schema({
  position: {
    type: Number,
    unique: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
  author: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Cite', CiteSchema);
