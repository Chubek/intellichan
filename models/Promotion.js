const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ThreadPromotionSchema = new Schema({
    thread_id: {
        type: String,
        required: true,
        unique: true
    },
    promotions_id: [String],
    is_active: {
        type: Boolean,
        default: false
    },
    type: String
})

const GoldPromotionSchema = new Schema({
    thread_promotion_id: {
        type: String,
        required: true
    }, //ThreadPromotionSchema
    transaction_id: String,
    buyer_id: String,
    date_from: Date,
    date_to: Date
})

const SilverPromotionSchema = new Schema({
    thread_promotion_id: {
        type: String,
        required: true
    }, //ThreadPromotionSchema
    transaction_id: String,
    buyer_id: String,
    date_from: Date,
    date_to: Date
})

const BronzePromotionSchema = new Schema({
    thread_promotion_id: {
        type: String,
        required: true
    }, //ThreadPromotionSchema
    transaction_id: String,
    buyer_id: String,
    date_from: Date,
    date_to: Date
})

const PromotionTransactionSchema = new Schema({
    promotion_id: {
        type: String,
        required: true
    },
    transaction_amount: mongoose.Types.Decimal128,
    buyer_id: String,
    finalized: {
        type: Boolean,
        default: false
    },
    payment_id: String
})


const UserPromotionSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    gold_promos: [String],
    silver_promos: [String],
    bronze_promos: [String],
    transactions_id: [String]
})

const PromotionTransaction = mongoose.model("PromotionTransaction", PromotionTransactionSchema)
const BronzePromotion = mongoose.model("BronzePromotion", BronzePromotionSchema)
const GoldPromotion = mongoose.model("GoldPromotion", GoldPromotionSchema)
const SilverPromotion = mongoose.model("SilverPromotion", SilverPromotionSchema)
const ThreadPromotion = mongoose.model("ThreadPromotion", ThreadPromotionSchema)
const UserPromotion = mongoose.model("UserPromotion", UserPromotionSchema)

module.exports = {
    PromotionTransaction,
    BronzePromotion,
    GoldPromotion,
    SilverPromotion,
    ThreadPromotion,
    UserPromotion
}