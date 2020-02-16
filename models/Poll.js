const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ThreadPollSchema = new Schema({
    thread_id: {
        type: String,
        required: true,
        unique: true
    },
    poll_options_id: [String],
    all_voters: [String],
    number_of_voters: Number
})

const PollOptionSchema = new Schema({
    post_poll_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    image_file_id: String,
    descirption: {
        type: String,
        maxlength: 100,
        trim: true
    },
    users_voted: [String],
    number_of_voters: Number

})

const PollImageFileSchema = new Schema({
    poll_id: {
        type: String,
        required: true,
        unique: true
    },
    file_location: String,
    sha256: String,
    file_title: String,
    file_type: String,
    mime_type: String

})

const PollImageFile = mongoose.model("PollImageFile", PollImageFileSchema)
const PollOption = mongoose.model("PollOption", PollOptionSchema)
const ThreadPoll = mongoose.model("ThreadPoll", ThreadPollSchema)

module.exports = {
    PollImageFile,
    PollOption,
    ThreadPoll
}