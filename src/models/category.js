const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('category', PostSchema);