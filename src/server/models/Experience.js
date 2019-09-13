import mongoose, { Schema } from 'mongoose';


const ExperienceSchema = new Schema({
  position: {
    type: String,
    required: true,
    unique: true,
  },
  from: String,
  to: String,
  company: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Experience', ExperienceSchema);
