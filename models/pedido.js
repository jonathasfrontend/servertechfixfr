const mongoose = require('mongoose')
const moment = require('moment')
const data = moment(new Date()).format('LL');

const PostSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        devicedescription: {
            type: String,
            required: true
        },
        defectdescription: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        createdAt:{
            type: String,
            default: data
        }
    }
);

module.exports = mongoose.model('order', PostSchema);