import mongoose, { Schema } from 'mongoose';
// helpers
import humanize from '../../shared/utils/humanize';


const options = {
  timestamps: true,
  toJSON: { virtuals: true },
};

const FileSchema = new Schema({
  kind: {
    type: String,
    enum: ['slider_image', 'curriculum_vitae', 'profile', 'skill_image', 'background_image'],
  },
  url: { type: String },
  name: { type: String },
  path: { type: String },
}, options);

// * gettters
function getDiffForHumans() { return humanize(this.createdAt); }
FileSchema.virtual('diffForHumans').get(getDiffForHumans);

export default mongoose.model('File', FileSchema);
