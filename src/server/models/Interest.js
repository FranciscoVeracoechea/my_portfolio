import mongoose, { Schema } from 'mongoose';


const InterestSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  faIcon: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model('Interest', InterestSchema);
