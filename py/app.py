from flask import Flask, request, jsonify
from convertVideo import VideoConverter
app = Flask(__name__)

vid_conv = VideoConverter()

@app.route('/convert/video', methods=["POST"])
def extract_keyword():
    videoLoc = request.json["video"]
    vid_conv.convert_video(videoLoc)
    return jsonify({"message": "Video converted."})