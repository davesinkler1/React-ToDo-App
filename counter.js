const mongoose = require('mongoose')

const counterSchema=new mongoose.Schema({
    id: String,
    seq_value: Number
});

module.exports = mongoose.model("Counter", counterSchema)