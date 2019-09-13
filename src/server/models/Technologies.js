import mongoose, { Schema } from 'mongoose';


const TechnologiesSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  level: {
    type: Number,
    min: 1,
    max: 5,
  },
  link: { type: String },
  category: {
    type: String, required: true, unique: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Technologies', TechnologiesSchema);
