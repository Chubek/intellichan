const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ThreadImageSchema = new Schema({
    thread_id: {
        type: String,
        required: true
    },
    image_file_id: String,
    image_metadata_id: String,
    thumb_file_id: String
})

const ImageFileSchema = new Schema({
    thread_image_id: {
        type: String,
        required: true
    }, //ThreadImageSchema
    upload_path: String,
    date_uploaded: {
        type: Date,
        default: Date.now 
    }
})

const ImageMetadataSchema = new Schema({
    thread_image_id: {
        type: String,
        required: true
    },
    sha256: String,
    exif: {
        file_name: String,
        file_size: Number,
        file_modify_date: Date,

        file_type: String,
        MIME_type: String,

        image_size_width: Number,
        image_size_height: Number,

        PNG: {
            bit_depth: Number,
            color_type: String,
            compression: String,
            filter: String,
            interlace: String
        },

        JPEG: {
            encoding_process: String,
            bps: Number,
            color_components: Number,
            YCbCr_ss: String,

            JFIF: {
                version: String,
                res_unit: String,
                X_res: Number,
                Y_res: Number
            }

        },

        GIF: {
            version: String,
            has_color_map: Boolean,
            color_res_depth: Number,
            bpp: Number,
            bg_color: Number,
            animation_iter: String,
            frame_count: Number,
            duration: mongoose.Types.Decimal128

        }
    }

})

const ImageThumbSchema = new Schema({
    thread_image_id: {
        type: String,
        required: true
    },
    thumb_location_url: String
})

//NOTE: as Vuetify can display images in different resolutions, the above schema will most likely go unused.

