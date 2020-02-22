import os

class AudioConverter:

    def __init__(self):
        pass

    def convert_audio(self, audioLoc, bitrate):
        locSplit = audioLoc.split("\\")
        nameWithExt = locSplit[-1]
        name = nameWithExt.split(".")

        if len(name[0:-1]) > 1:
            name = ".".join(name)
        
        extension = nameWithExt.split(".")[-1]
        newFile = name + ".mp4"
        path = audioLoc.replace(nameWithExt, '')
        newPath = path + newFile
        newOld = path + "old." + extension

        os.rename(audioLoc, newOld)

        command = f"sox −r {bitrate} −e signed −b 8 {newOld} {newPath}"

        os.system(command)

        os.remove(newOld)