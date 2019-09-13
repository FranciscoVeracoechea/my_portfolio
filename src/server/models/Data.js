import mongoose, { Schema } from 'mongoose';


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
  category: {
    type: String,
    enum: [
      'about_me', 'contact', 'interest', 'objective', 'technical_description',
    ],
  },
}, {
  timestamps: true,
});

export default mongoose.model('Data', DataSchema);
