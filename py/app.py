from flask import Flask, request, jsonify
from convertVideo import VideoConverter
from convertAudio import AudioConverter
app = Flask(__name__)

vid_conv = VideoConverter()
aud_conv = AudioConverter()

@app.route('/convert/video', methods=["POST"])
def convert_video():
    videoLoc = request.json["video"]
    width = request.json["width"]
    heigth = request.json["height"]
    bitrate = request.json["bitrate"]
    vid_conv.convert_video(videoLoc, width, heigth, bitrate)
    return jsonify({"message": "Video converted."})

@app.route('/convert/audio', methods=["POST"])
def convert_audio():
    audioLoc = request.json["audio"]
    bitrate = request.json["bitrate"]
    aud_conv.convert_audio(audioLoc, bitrate)
    return jsonify({"message": "Audio converted."})