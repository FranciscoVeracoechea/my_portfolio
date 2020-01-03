import mongoose, { Schema } from 'mongoose';
// helpers
import humanize from '../../shared/utils/humanize';


const options = {
  timestamps: true,
  toJSON: { virtuals: true },
};

export const SkillSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  level: {
    type: Number,
    min: 1,
    max: 5,
  },
  image: { type: Schema.Types.ObjectId, ref: 'File' },
  link: { type: String },
}, options);

export const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  order: { type: Number, unique: true },
  technologies: [SkillSchema],
}, options);

// * gettters
function getDiffForHumans() { return humanize(this.createdAt); }
function getSkillCount() { return this.technologies.length; }

SkillSchema.virtual('diffForHumans').get(getDiffForHumans);
SkillSchema.virtual('categoryName').get(function categoryName() {
  return this.parent().name;
});

CategorySchema.virtual('diffForHumans').get(getDiffForHumans);
CategorySchema.virtual('skillCount').get(getSkillCount);

export default mongoose.model('Technologies', CategorySchema);
