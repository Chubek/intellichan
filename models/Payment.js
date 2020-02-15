const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TransactionPaymentSchema = new Schema({
    transaction_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: String,
    amount: mongoose.Types.Decimal128,
    currency: String,
    coupon_id: String,
    finalized: {
        type: Boolean,
        default: false
    }
})

const PaymentCouponSchema = new Schema({
    payment_id: {
        type: String,
        required: true,
    },
    coupon_code: String,
    cutoff_percentage: Number

})

const TransactionPayment = mongoose.model("TransactionPayment", TransactionPaymentSchema)
const PaymentCoupon = mongoose.model("PaymentCoupon", PaymentCouponSchema)

module.exports = {
    TransactionPayment,
    PaymentCoupon
}