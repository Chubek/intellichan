const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    display_name: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    password: {
        type: String,
        required: true
    },
    date_registered: {
        type: Date,
        default: Date.now
    },
    info_id: String,
    permission_id: String,
    transactions_id: [String],
    recommender_id: String,
    votes_id: String,
    users_subbed: [String],
    subbed_users: [String],
    banned_id: String,
    cert_id: String,
    payment_id: String,
    promotions_id: String,
    watcher_id: String,
    sent_ips: [String],
    last_ip: String
    

})

const UserInfoSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        biography: String,
        lives_in: String,
        birthday: Date,
        age: Number,

    },
    pages: {
        facebook_profile: String,
        twitter_profile: String,
        reddit_profile: String,
        tiktok_id: String,
        google_id: String,
        youtube_profile: String,
        pinterest_profile: String,
    
    },
    gamertags: {
        xbl: String,
        psn: String,
        steam: String
    },
    number_of_posts: {
        type: Number,
        default: 0
    },


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
    
    vip_id: [String]
})

const UserVIPSchema = new Schema({
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
    vip_id: String,
    date: {
        type: Date,
        default: Date.now
    },
    amount: mongoose.Types.Decimal128,
    paid: {
        type: Boolean,
        default: false
    },
    payment_id: String
})

const UserBannedSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },     
    date_started: {
        type: Date,
        default: Date.now
    },
    date_ends: {
        type: Date
    }
})

const BannedUsers = new Schema({

})

const User = mongoose.model("User", UserSchema)
const UserTransaction = mongoose.model("UserTransacion", UserTransactionsSchema)
const UserVIP = mongoose.model("UserGold", UserVIPSchema)
const UserPermission = mongoose.model("UserPermission", UserPermissionSchema)
const UserInfo = mongoose.model("UserInfo", UserInfoSchema)
const UserBanned = mongoose.model("UserBanned", UserBannedSchema)



module.exports = {User,
                    UserTransaction,
                    UserVIP,
                    UserPermission,
                    UserInfo,
                    UserBanned}