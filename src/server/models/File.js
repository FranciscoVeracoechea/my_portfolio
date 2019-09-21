import mongoose, { Schema } from 'mongoose';


export const FileSchema = new Schema({
  kind: {
    type: String,
    enum: ['picture', 'curriculum_vitae'],
  },
  url: { type: String },
  name: String,
}, {
  timestamps: true,
});

export const File = mongoose.model('File', FileSchema);
