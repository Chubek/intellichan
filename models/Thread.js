const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ImageOPSchema = new Schema({
    numerical_id: {
        type: Number,
        required: true,
        unique: true
    },
    submitter_id: {
        type: String,
        required: true,

    },
    submitter_name: String,
    images_id: [String],
    content_id: String,
    meta_rec_id: String, //recommender system stuff
    date_submitted: {
        type: Date,
        default: Date.now
    },
    votes_id: String,
    replies_id: [String]

})

const VideoOPSchema = new Schema({
    numerical_id: {
        type: Number,
        required: true,
        unique: true
    },
    submitter_id: {
        type: String,
        required: true,

    },
    submitter_name: String,
    video_id: String,
    content_id: String,
    meta_rec_id: String, //recommender system stuff
    date_submitted: {
        type: Date,
        default: Date.now
    },
    votes_id: String,
    replies_id: [String]

})

const AnonymousOPSchema = new Schema({
    numerical_id: {
        type: Number,
        required: true,
        unique: true
    },
    submitter_name: {
        type: String,
        default: "Anonymous"
    },
    image_id: String,
    content_id: String,
    date_submitted: {
        type: Date,
        default: Date.now
    },
    replies_id: [String],
    votes_id: String
})


const ThreadReplySchema = new Schema({
    numerical_id: {
        type: Number,
        required: true,
        unique: true
    },
    op_id: {
        type: String,
        required: true
    },
    op_type: String,
    image_id: String,
    content_id: String,
    date_submitted: {
        type: Date,
        default: Date.now
    },
    votes_id: String
})

const PostContentSchema = new Schema({
    post_id: {
        type: String,
        required: true
    },
    post_type: String,
    title: {
        type: String,
        default: ''
    },
    body: String,

})

const PostContent = mongoose.model("PostContent", PostContentSchema)
const ThreadReply = mongoose.model("ThreadReply", ThreadReplySchema)
const AnonymousOP = mongoose.model("AnonymousOP", AnonymousOPSchema)
const VideoOP = mongoose.model("VideoOP", VideoOPSchema)
const ImageOP = mongoose.model("ImageOP", ImageOPSchema)

module.exports = {PostContent,
                    ThreadReply,
                    AnonymousOP,
                    VideoOP,
                    ImageOP}