const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stackSchema = new Schema({
    stack_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    techs: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model("stacks", stackSchema);