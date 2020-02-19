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
    image_id: String,
    content_id: String,
    meta_rec_id: String, //recommender system stuff
    date_submitted: {
        type: Date,
        default: Date.now
    },
    votes_id: String,
    replies_id: [String],
    cert_id: String,
    spam_ham_id: String,
    hidden_id: String,
    promoted_id: String,
    watched_id: [String],
    sent_ip: String,
    poll_id: String
    

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
    replies_id: [String],
    cert_id: String,
    spam_ham_id: String,
    hidden_id: String,
    promoted_id: String,
    watched_id: [String],
    sent_ip: String,
    poll_id: String

})

const AudioOPSchema = new Schema({
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
    audios_id: [String],
    content_id: String,
    meta_rec_id: String, //recommender system stuff
    date_submitted: {
        type: Date,
        default: Date.now
    },
    votes_id: String,
    replies_id: [String],
    cert_id: String,
    spam_ham_id: String,
    hidden_id: String,
    promoted_id: String,
    watched_id: [String],
    sent_ip: String,
    poll_id: String

})

const AnonymousOPSchema = new Schema({
    numerical_id: {
        type: Number,
        required: true,
        unique: true
    },
    submitter_id: String,
    submitter_name: {
        name_field: {
            type: String,
            default: "Anonymous"
        },
        tripcode: {
            type: String,
            default: ''
        }
    },
    image_id: String,
    content_id: String,
    meta_rec_id: String,
    date_submitted: {
        type: Date,
        default: Date.now
    },
    replies_id: [String],
    votes_id: String,
    cert_id: String,
    spam_ham_id: String,
    hidden_id: String,
    watched_id: [String],
    sent_ip: String
})


const AnonymousReplySchema = new Schema({
    numerical_id: {
        type: Number,
        required: true,
        unique: true
    },
    op_id: {
        type: String,
        required: true
    },
    submitter_id: {
        type: String,
        required: true,

    },
    submitter_name: {
        name_field: {
            type: String,
            default: "Anonymous"
        },
        tripcode: {
            type: String,
            default: ''
        }
    },
    image_id: String,
    content_id: String,
    date_submitted: {
        type: Date,
        default: Date.now
    },
    votes_id: String,
    cert_id: String,
    spam_ham_id: String,
    hidden_id: String,
    sent_ip: String

})


const ImageReplySchema = new Schema({
    numerical_id: {
        type: Number,
        required: true,
        unique: true
    },
    op_id: {
        type: String,
        required: true
    },
    submitter_id: {
        type: String,
        required: true,

    },
    submitter_name: String,
    image_id: String,
    content_id: String,
    date_submitted: {
        type: Date,
        default: Date.now
    },
    votes_id: String,
    cert_id: String,
    spam_ham_id: String,
    hidden_id: String,
    sent_ip: String
})


const VideoReplySchema = new Schema({
    numerical_id: {
        type: Number,
        required: true,
        unique: true
    },
    op_id: {
        type: String,
        required: true
    },
    submitter_id: {
        type: String,
        required: true,

    },
    submitter_name: String,
    video_id: String,
    content_id: String,
    date_submitted: {
        type: Date,
        default: Date.now
    },
    votes_id: String,
    cert_id: String,
    spam_ham_id: String,
    hidden_id: String,
    sent_ip: String
})


const AudioReplySchema = new Schema({
    numerical_id: {
        type: Number,
        required: true,
        unique: true
    },
    op_id: {
        type: String,
        required: true
    },
    submitter_id: {
        type: String,
        required: true,

    },
    submitter_name: String,
    audio_id: String,
    content_id: String,
    date_submitted: {
        type: Date,
        default: Date.now
    },
    votes_id: String,
    cert_id: String,
    spam_ham_id: String,
    hidden_id: String,
    sent_ip: String
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
    message: String,

})

const HamSpamSchema = new Schema({
    post_id: {
        type: String,
        required: true,
        unique: true
    },
    ham_percentage: Number,
    spam_percentage: Number
})

const HiddenPostSchema = new Schema({
    post_id: {
        type: String,
        required: true,
        unique: true
    },
    user_hidden: {
        type: Boolean,
        default: false
    },
    mod_hidden: {
        type: Boolean,
        default: false
    },
    admin_hidden: {
        type: Boolean,
        default: false
    }
})

const PostContent = mongoose.model("PostContent", PostContentSchema)
const ImageReply = mongoose.model("ImageReply", ImageReplySchema)
const VideoReply = mongoose.model("VideoReply", VideoReplySchema)
const AudioReply = mongoose.model("AudioReply", AudioReplySchema)
const AnonymousReply = mongoose.model("AnonymousReply", AnonymousReplySchema)
const AnonymousOP = mongoose.model("AnonymousOP", AnonymousOPSchema)
const VideoOP = mongoose.model("VideoOP", VideoOPSchema)
const ImageOP = mongoose.model("ImageOP", ImageOPSchema)
const AudioOP = mongoose.model("AudioOP", AudioOPSchema)
const HamSpam = mongoose.model("HamSpam", HamSpamSchema)
const HiddenPost = mongoose.model("HiddenPost", HiddenPostSchema)

module.exports = {PostContent,
                    ImageReply,
                    AudioReply,
                    VideoReply,
                    AnonymousReply,
                    AudioOP,
                    AnonymousOP,
                    VideoOP,
                    ImageOP,
                    HiddenPost,
                    HamSpam}