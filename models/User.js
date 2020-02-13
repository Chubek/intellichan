const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    display_name: {
        type: String,
        required: true,
        unique: true
    },
    info_id: String,
    permission_id: String,
    transactions_id: [String],
    recommender_id: String,
    post_votes_id: String,
    users_subbed: [String],
    subbed_users: [String],
    banned_id: String

})

const UserInfoSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    bio: String,
    number_of_posts: {
        type: Number,
        default: 0
    },
    date_registered: {
        type: Date,
        default: Date.now
    }

})

const UserVotesSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    upvoted_posts: [String],
    downvoted_posts: [String],
    posts_upvoted: [String],
    posts_downvoted: [String],
    upvoted_threads: [String],
    downvoted_threads: [String],
    threads_upvoted: [String],
    threads_downvoted: [String],
    post_score: {
        type: Number,
        default: 1
    },
    thread_score: {
        type: Number,
        default: 1
    }  
})

const UserPermissionSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    is_normal: {
        type: Boolean,
        default: true
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    is_mod: {
        type: Boolean,
        default: false
    },
    is_janitor: {
        type: Boolean,
        default: false
    },
    
    golds_id: [String]
})

const UserGoldSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: false
    },
    date_subscribed: Date,
    date_ends: Date,
    transaction_id: String
})

const UserTransactionsSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    gold_id: String,
    date: {
        type: Date,
        default: Date.now
    },
    amount: mongoose.Types.Decimal128,
    paid: {
        type: Boolean,
        default: false
    }

})

const UserBannedSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: false
    },
    date_started: Date,
    date_ended: Date
})


const User = mongoose.model("User", UserSchema)
const UserTransaction = mongoose.model("UserTransacion", UserTransactionsSchema)
const UserGold = mongoose.model("UserGold", UserGoldSchema)
const UserPermission = mongoose.model("UserPermission", UserPermissionSchema)
const UserVotes = mongoose.model("UserVotes", UserVotesSchema)
const UserInfo = mongoose.model("UserInfo", UserInfoSchema)
const UserBanned = mongoose.model("UserBanned", UserBannedSchema)



module.exports = {User,
                    UserTransaction,
                    UserGold,
                    UserPermission,
                    UserVotes,
                    UserInfo,
                    UserBanned}