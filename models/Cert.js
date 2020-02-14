const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ThreadCertSchema = new Schema({
    thread_id: {
        type: String,
        required: true,
        unique: true
    },
    integral_certs_id: [String],
    woke_certs_id: [String],
    lame_certs_id: [String],
    total_integrals: {
        type: Number,
        default: 0
    },
    total_wokes: {
        type: Number,
        default: 0
    },
    total_lame: {
        type: Number,
        default: 0
    }
})

const ReplyCertSchema = new Schema({
    reply_id: {
        type: String,
        required: true,
        unique: true
    },
    positive_certs: [String],
    negative_certs: [String],
    total_pos: {
        type: Number,
        default: 0
    },
    total_neg: {
        type: Number,
        default: 0
    }
})

const IntegralCertSchema = new Schema({
    thread_cert_id: {
        type: String,
        required: true 
    }, //ThreadCert
    reached_score: Number,
    date_given: {
        type: Date,
        default: Date.now
    },
    cert_alias: {
        type: String,
        default: "Integral"
    }
})

const WokeCertSchema = new Schema({
    thread_cert_id: {
        type: String,
        required: true,
        default: ''
    },
    owner_id: String,
    transaction_id: String,
    date_given: {
        type: Date,
        default: Date.now
    },
    redeemed: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: 10,
        min: 10,
        max: 50
    }


})

const LameCertSchema = new Schema({
    thread_cert_id: {
        type: String,
        required: true,
        default: ''
    },
    owner_id: String,
    transaction_id: String,
    date_given: {
        type: Date,
        default: Date.now
    },
    redeemed: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: -10,
        min: -50,
        max: -10
    }


})


const PositiveCertSchema = new Schema({
    thread_cert_id: {
        type: String,
        required: true,
        default: ''
    },
    owner_id: String,
    transaction_id: String,
    date_given: {
        type: Date,
        default: Date.now
    },
    redeemed: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: 10,
        min: 10,
        max: 50
    }

})


const NegativeCertSchema = new Schema({
    thread_cert_id: {
        type: String,
        required: true,
        default: ''
    },
    owner_id: String,
    transaction_id: String,
    date_given: {
        type: Date,
        default: Date.now
    },
    redeemed: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: -10,
        max: -10,
        min: -50
    }

})

const UserCertSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    woke_certs_id: [String],
    lame_certs_id: [String],
    neg_certs_id: [String],
    pos_certs_id: [String],
    amount_spent_on_certs: mongoose.Types.Decimal128
})

const CertTransactionSchema = new Schema({
    cert_id: {
        type: String,
        required: true
    },
    buyer_id: String,
    amount: mongoose.Types.Decimal128,
    finalized: {
        type: Boolean,
        default: false
    }
})

const  CertTransaction = mongoose.model("CertTransaction",  CertTransactionSchema)
const  UserCert = mongoose.model("UserCert",  UserCertSchema)
const  NegativeCert = mongoose.model("NegativeCert",  NegativeCertSchema)
const  PositiveCert = mongoose.model("PositiveCert",  PositiveCertSchema)
const  LameCert = mongoose.model("LameCert",  LameCertSchema)
const WokeCert = mongoose.model("WokeCert", WokeCertSchema)
const IntegralCert = mongoose.model("IntegralCert", IntegralCertSchema)
const ReplyCert = mongoose.model("ReplyCert", ReplyCertSchema)
const ThreadCert = mongoose.model("ThreadCert", ThreadCertSchema)

module.exports = {CertTransaction,
                UserCert,
                NegativeCert,
                PositiveCert,
                LameCert,
                WokeCert,
                IntegralCert,
                ReplyCert,
                ThreadCert}