const mongoose = require("mongoose")
const Schema = mongoose.Schema


const StreamSchema = new Schema({
    stream_user: String,
    includes: {
        includes_image: Boolean,
        includes_video: Boolean,
        includes_audio: Boolean,
        includes_anonymous: Boolean
    },
    date_conditions: {
        greater_than: Date,
        less_than: Date,
        equals_to: Date
    },
    user_conditions: {
        users_included: [String],
        users_excluded: [String],
        date_registered_gt: Date,
        date_registered_lt: Date,
        date_registered_eq: Date
    },
    image_conditions: {
        height: Number,
        width: Number
    },
    audio_conditions: {
        duration: String
    },
    video_conditions: {
        duration: String
    },
    title_conditions: {
        included_words: [String],
        excluded_words: [String]
    },
    body_conditions: {
        included_words: [String],
        excluded_words: [String]
    },
    body_tags: {
        included_tags: [String],
        excludes_tags: [String]
    },
    body_hashtags: {
        included_hashtags: [String],
        excludes_hashtags: [String]
    },
    category_conditions: {
        included_categories: [String],
        excludes_categories: [String]
    }

})


const UserStreamSchema = new Schema({
    users_id: {
        type: [String],
        required: true
    },
    stream_id: String
})

const Stream = mongoose.model("Stream", StreamSchema)
const UserStream = mongoose.model("UserStream", UserStreamSchema)

module.exports = {
    Stream,
    UserStream
}