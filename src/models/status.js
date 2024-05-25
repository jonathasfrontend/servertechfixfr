const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('status', PostSchema);