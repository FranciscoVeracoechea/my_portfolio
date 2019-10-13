import mongoose, { Schema } from 'mongoose';


const FileSchema = new Schema({
  kind: {
    type: String,
    enum: ['picture', 'curriculum_vitae', 'profile'],
  },
  url: { type: String },
  name: { type: String },
  path: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model('File', FileSchema);
