const express = require('express');
const router = express.Router();
const DailyInspiration = require('../models/DailyInspiration');

// @route   POST /api/inspiration
// @desc    Create a new daily inspiration entry
router.post('/', async (req, res) => {
  try {
    const { date, language, title, sections } = req.body;

    // basic validation to ensure essential data is present
    if (!date || !sections || sections.length === 0) {
      return res.status(400).json({ message: 'Date and content sections are required.' });
    }

    // Create and save the new document
    const newInspiration = new DailyInspiration({
      date,
      language,
      title,
      sections
    });

    const savedInspiration = await newInspiration.save();
    res.status(201).json(savedInspiration);

  } catch (error) {
    // Handle duplicate date/language errors gracefully
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An entry already exists for this date and language.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error tracking data.' });
  }
});

module.exports = router;
