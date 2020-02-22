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
    type: String,
    mime_type: String,
    size: Number,  
    width: Number,
    height: Number,
    exif_data: { 
        image: 
            { Make: String,
              Model: String,
              Orientation: Number,
              XResolution: Number,
              YResolution: Number,
              ResolutionUnit: Number,
              Software: String,
              ModifyDate: Date,
              ExifOffset: Number,
              GPSInfo: Number 
            },
           exif: 
            { ExposureTime: mongoose.Types.Decimal128,
              FNumber: mongoose.Types.Decimal128,
              ExposureProgram: Number,
              ISO: Number,
              ExifVersion: Buffer,
              DateTimeOriginal: Date,
              DateTimeDigitized: Date,
              ComponentsConfiguration: Buffer,
              ShutterSpeedValue: mongoose.Types.Decimal128,
              ApertureValue: mongoose.Types.Decimal128,
              BrightnessValue: mongoose.Types.Decimal128,
              ExposureBiasValue: Number,
              MeteringMode: Number,
              Flash: Number,
              FocalLength: mongoose.Types.Decimal128,
              SubjectArea: [Number],
              MakerNote: Buffer,
              SubSecTimeOriginal: String,
              SubSecTimeDigitized: String,
              FlashpixVersion: Buffer,
              ColorSpace: Number,
              PixelXDimension: Number,
              PixelYDimension: Number,
              SensingMethod: Number,
              SceneType: Buffer,
              ExposureMode: Number,
              WhiteBalance: Number,
              FocalLengthIn35mmFormat: Number,
              SceneCaptureType: Number,
              LensSpecification: [mongoose.Types.Decimal128],
              LensMake: String,
              LensModel: String },
           gps: 
            { GPSLatitudeRef: String,
              GPSLatitude: [mongoose.Types.Decimal128],
              GPSLongitudeRef: String,
              GPSLongitude: [mongoose.Types.Decimal128],
              GPSAltitudeRef: Number,
              GPSAltitude: Number,
              GPSTimeStamp: [mongoose.Types.Decimal128],
              GPSSpeedRef: String,
              GPSSpeed: Number,
              GPSImgDirectionRef: String,
              GPSImgDirection: mongoose.Types.Decimal128,
              GPSDestBearingRef: String,
              GPSDestBearing: mongoose.Types.Decimal128,
              GPSDateStamp: String } 
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

const ImageLocationSchema = new Schema({
    thread_image_id: {
        type: String,
        required: true,
        unique: true
    },
    location: String,
    shared: {
        type: Boolean,
        default: false
    }
})

const ThreadAudioSchema = new Schema({
    thread_id: {
        type: String,
        required: true
    },
    audio_file_id: String,
    audio_metadata_id: String,
    
})

const AudioFileSchema = new Schema({
    thread_audio_id: {
        type: String,
        required: true
    }, //ThreadAudioSchema
    upload_path: String,
    date_uploaded: {
        type: Date,
        default: Date.now 
    }
})

const AudioMetadataSchema = new Schema({
    thread_audio_id: {
        type: String,
        required: true
    },
    sha256: String,
    type: String,
    mime_type: String,
    size: Number,
    duration: String,      
    
})

const ThreadVideoSchema = new Schema({
    thread_id: {
        type: String,
        required: true
    },
    video_file_id: String,
    video_metadata_id: String,
    thumb_file_id: String
})

const VideoFileSchema = new Schema({
    thread_video_id: {
        type: String,
        required: true
    }, //ThreadVideoSchema
    upload_path: String,
    date_uploaded: {
        type: Date,
        default: Date.now 
    }
})

const VideoThumbSchema = new Schema({
    thread_video_id: {
        type: String,
        required: true,
    },
    thumb_path: String,
    date_created: {
        type: Date,
        default: Date.now
    }
})

const VideoMetadataSchema = new Schema({
    thread_video_id: {
        type: String,
        required: true
    },
    sha256: String,
    type: String,
    mime_type: String,
    size: Number,
    duration: String   
    

})

const VideoMetadata = mongoose.model("VideoMetadata", VideoMetadataSchema)
const AudioMetadata = mongoose.model("AudioMetadata", AudioMetadataSchema)
const ImageMetadata = mongoose.model("ImageMetadata", ImageMetadataSchema)
const VideoFile = mongoose.model("VideoFile", VideoFileSchema)
const AudioFile = mongoose.model("AudioFile", AudioFileSchema)
const ImageFile = mongoose.model("ImageFile", ImageFileSchema)
const ThreadVideo = mongoose.model("ThreadVideo", ThreadVideoSchema)
const ThreadAudio = mongoose.model("ThreadAudio", ThreadAudioSchema)
const ThreadImage = mongoose.model("ThreadImage", ThreadImageSchema)
const ImageLocation = mongoose.model("ImageLocation", ImageLocationSchema)
const VideoThumb = mongoose.model("VideoThumb",  VideoThumbSchema)
const ImageThumb = mongoose.model("ImageThumb", ImageThumbSchema)

module.exports = {
    VideoMetadata,
    AudioMetadata,
    ImageMetadata,
    VideoFile,
    AudioFile,
    ImageFile,
    ThreadAudio,
    ThreadVideo,
    ThreadImage,
    ImageLocation,
    VideoThumb,
    ImageThumb
}