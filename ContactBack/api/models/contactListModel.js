var mongoose = require('mongoose')

const { Schema } = mongoose;

const ContactSchema = new Schema({
    cid: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: String,
    mobile: {
        type: String,
        required: true
    },
    facebook: String,
    imageUrl: String,
}, { collection: 'Contacts' });

module.exports = mongoose.model('Contacts', ContactSchema);