import mongoose, { Schema } from 'mongoose';
// helpers
import humanize from '../../shared/utils/humanize';


const options = {
  timestamps: true,
  toJSON: { virtuals: true },
};

export const TechnologySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  level: {
    type: Number,
    min: 1,
    max: 5,
  },
  link: { type: String },
}, options);

export const TechnologyCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  order: { type: Number, unique: true },
  technologies: [TechnologySchema],
}, options);

function getDiffForHumans() { return humanize(this.createdAt); }

TechnologySchema.virtual('diffForHumans').get(getDiffForHumans);
TechnologySchema.virtual('categoryName').get(function categoryName() {
  return this.parent().name;
});

TechnologyCategorySchema.virtual('diffForHumans').get(getDiffForHumans);

export default mongoose.model('Technologies', TechnologyCategorySchema);
