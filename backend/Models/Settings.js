const mongoose = require('mongoose');
const { Schema } = mongoose;

const SettingsSchema = new Schema({
    No: {
        type: Number,
        unique: true,
    },
    Studenttotal: {
        type: Number,
    },
    NoOfCourses: {
        type: Number,
    },
    NoOfBatches: {
        type: Number,
    },
    TotalStaffs: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Apply auto-increment plugin to the SettingsSchema

const Settings = mongoose.model('settings', SettingsSchema);

module.exports = Settings;
