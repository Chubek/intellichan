const mongoose = require("mongoose")
const Schema = mongoose.Schema


const StreamSchema = new Schema({
    stream_user_id: String,
    user_conditions_id: String,
    image_conditions_id: String,
    audio_conditions_id: String,
    vide_conditions_id: String,
    title_conditions_id: String,
    body_conditions_id: String,
    body_tags_id: String,
    body_hashtags_id: String

})


const UserStreamSchema = new Schema({
    users_id: {
        type: [String],
        required: true
    },
    stream_id: String
})

const StreamUserConditionsSchema = new Schema({
    stream_id: {
        type: String,
        required: true,
        unique: true
    },
    users_included: [String],
    users_excluded: [String],
    date_registered_gt: Date,
    date_registered_lt: Date,
    date_registered_eq: Date
})

