const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const techSchema = new Schema({
    tech_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: (val) => {
            return validator.isURL(val);
        }
    },
    exp: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("techs", techSchema);