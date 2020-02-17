const mongoose = require("mongoose")
const Schema = mongoose.Schema


const SuperadminSettingsSchema = new Schema({
    superadmin_display_name: {
        type: String,
        maxlength: 20,
        required: true,
        unique: true
    },
    superadmin_email: {
        type: String,
        required: true,
        unique: true
    },
    superadmin_first_password: String,
    superadmin_password_second: String
    

})


const SuperadminSettings = mongoose.model("SuperadminSettings", SuperadminSettingsSchema)

module.exports = {
    SuperadminSettings
}