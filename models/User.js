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
    votes_id: String,
    users_subbed: [String],
    subbed_users: [String],
    banned_id: String,
    cert_id: String,
    payment_id: String

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