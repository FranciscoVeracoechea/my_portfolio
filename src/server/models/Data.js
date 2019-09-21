import mongoose, { Schema } from 'mongoose';


export const categories = [
  'about_me', 'contact', 'objective', 'technical_description',
];

const DataSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: Map,
    of: String,
  },
  faIcon: String,
  category: {
    type: String,
    enum: categories,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Data', DataSchema);
