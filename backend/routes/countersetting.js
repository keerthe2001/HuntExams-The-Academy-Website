const express = require('express');
const router = express.Router();
const Settings = require('../Models/Settings');
const fetchuser = require('../Middleware/fetchuser');


// Add settings for the first time
router.post('/addSettings',fetchuser, async (req, res) => {
    try {
        // Check if settings already exist
        const existingSettings = await Settings.find();
        if (existingSettings.length > 0) {
            return res.status(400).json({ error: 'Settings already exist.' });
        }

        // Create new settings
        const newSettings = new Settings(req.body);
        await newSettings.save();

        res.json({ success: true, message: 'Settings added successfully.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
// Get Counter Settings
router.get('/countersetting', async (req, res) => {
    try {
        const countersetting = await Settings.findOne({}); // Assuming there's only one document for counter settings
        res.json(countersetting);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// Update Counter Settings
router.put('/countersetting/:id',fetchuser, async (req, res) => {
    try {
        const updatedCounterSetting = await Settings.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedCounterSetting);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
