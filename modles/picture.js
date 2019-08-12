const mongoose = require("mongoose")
const Schema = mongoose.Schema
const picturSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    beforePic: {
        type: String,
        required: true,
    },
    afterPic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "Call or visit for mor infromation."
    }
})

module.exports = mongoose.model("Pictures", picturSchema)