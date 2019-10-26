import mongoose, { Schema } from 'mongoose';


export const TechnologySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  level: {
    type: Number,
    min: 1,
    max: 5,
  },
  link: { type: String },
}, {
  timestamps: true,
});

export const TechnologyCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  order: { type: Number, unique: true },
  technologies: [TechnologySchema],
}, {
  timestamps: true,
});


export default mongoose.model('Technologies', TechnologyCategorySchema);
