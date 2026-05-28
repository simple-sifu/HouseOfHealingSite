const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    sectionType: {
      type: String,
      required: true,
      enum: ['verse', 'commentary', 'prayer', 'reflection'],
    },
    reference: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const dailyInspirationSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      default: 'en',
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      trim: true,
    },
    sections: {
      type: [sectionSchema],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one section is required.',
      },
    },
  },
  { timestamps: true }
);

dailyInspirationSchema.index({ date: 1, language: 1 }, { unique: true });

module.exports = mongoose.model('DailyInspiration', dailyInspirationSchema);
