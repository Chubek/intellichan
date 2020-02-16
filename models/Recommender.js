const mongoose = require("mongoose")
const Schema = mongoose.Schema
const _ = require("underscore")

const ThreadRecSchema = new Schema({
    post_id: {
        type: String,
        required: true,
        unique: true
    },
    thread_tags_id: String,
    thread_hashtags_id: String,
    thread_location_id: String,
    thread_mood_percentage: {
        sadness: Number,
        fear: Number,
        anger: Number, 
        love: Number, 
        joy: Number, 
        surprise: Number
    },
    user_thread_durations_id: String,
    user_thread_replies_id: String, //number of times replied
    user_thread_votes_id: String //number of times voted

})

const UserRecSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    user_tags_id: String,
    user_hashtags_id: String,
    user_mood_selected: String,
    user_mood_calculated: String,    
    user_thread_durations_id: String,
    user_thread_replies_id: String, //number of times replied
    user_thread_votes_id: String, //number of times voted
    viewed_threads_id: String
})

const TagIdSchema = new Schema({
    tag_name: {
        type: String,
        unique: true
    },
    tag_id: {
        type: Number,
        default: _.random(0, Math.pow(1000, 100))
    }
})

const HashtagIdSchema = new Schema({
    hashtag_name: {
        type: String,
        unique: true
    },
    hashtag_id: {
        type: Number,
        default: _.random(0, Math.pow(1000, 100))
    }
})

const ThreadLocationSchema = new Schema({
    thread_rec_id: {
        type: String,
        required: true,
        unique: true
    },
    location: String
})

const UserTagSchema = new Schema({
    user_rec_id: {
        type: String,
        required: true,
        unique: true
    }, //UserRecSchema
    interacted_tags_id: [Number],
    interacted_tags_name: [String]
})

const ThreadTagSchema = new Schema({
    thread_rec_id: {
        type: String,
        required: true,
        unique: true
    }, //ThreadRecSchema
    tags_id: [Number],
    tags_name: [String]
})


const UserHashtagSchema = new Schema({
    user_rec_id: {
        type: String,
        required: true,
        unique: true
    }, //UserRecSchema
    interacted_hashtags_id: [Number],
    interacted_hashtags_name: [String]
})

const ThreadHashtagSchema = new Schema({
    thread_rec_id: {
        type: String,
        required: true,
        unique: true
    }, //ThreadRecSchema
    hashtags_id: [Number],
    tags_name: [String]
})


const UserThreadDurationSchema = new Schema({
    thread_rec_id: {
        type: String,
        required: true,
        unique: true
    },
    user_rec_id: {
        type: String,
        required: true,
        unique: true
    },
    duration_spent: {
        type: Number,
        default: 0
    }

})

const UserThreadVoteSchema = new Schema({
    thread_rec_id: {
        type: String,
        required: true,
        unique: true
    },
    user_rec_id: {
        type: String,
        required: true,
        unique: true
    },
    votes_given: {
        type: Number,
        default: 0
    }

})

const UserThreadRepliesSchema = new Schema({
    thread_rec_id: {
        type: String,
        required: true,
        unique: true
    },
    user_rec_id: {
        type: String,
        required: true,
        unique: true
    },
    replies_posted: {
        type: Number,
        default: 0
    }

})

const ViewedThreadSchema = new Schema({
    user_rec_id: {
        type: String,
        required: true
    },
    viewed_threads: [String],


})



const ViewedThread = mongoose.model("ViewedThread", ViewedThreadSchema)
const UserThreadReplies = mongoose.model("UserThreadReplies", UserThreadRepliesSchema)
const UserThreadVote = mongoose.model("UserThreadVote", UserThreadVoteSchema)
const UserThreadDuration = mongoose.model("UserThreadDuration", UserThreadDurationSchema)
const ThreadHashtag = mongoose.model("ThreadHashtag", ThreadHashtagSchema)
const UserHashtag = mongoose.model("UserHashtag", UserHashtagSchema)
const ThreadTag = mongoose.model("ThreadTag", ThreadTagSchema)
const UserTag = mongoose.model("UserTag", UserTagSchema)
const HashtagId = mongoose.model("HashtagId", HashtagIdSchema)
const TagId = mongoose.model("TagId", TagIdSchema)
const UserRec = mongoose.model("UserRec", UserRecSchema)
const ThreadRec = mongoose.model("ThreadRec", ThreadRecSchema)
const ThreadLocation = mongoose.model("ThreadLocation", ThreadLocationSchema)

module.exports = {
    ViewedThread,
    UserThreadReplies,
    UserThreadVte,
    UserThreadVote,
    UserThreadDuration,
    ThreadHashtag,
    UserHashtag,
    ThreadTag,
    UserTag,
    HashtagId,
    TagId,
    UserRec,
    ThreadRec,
    ThreadLocation
}