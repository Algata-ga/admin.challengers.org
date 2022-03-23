import time
import mimetypes
import subprocess, json
mimetypes.init()

def getFilename(metadata,filename):
    extension=filename.split('.')[-1]
    name = metadata['title'].replace(' ','')+str(int(time.time()))+'.'+extension
    return name


def isVideoFile(fileName):
    mimestart = mimetypes.guess_type(fileName)[0]
    if mimestart != None:
        mimestart = mimestart.split('/')[0]
        if mimestart in ['video']:
            return True
    return False

def getVideoDuration(filename):
    result = subprocess.check_output(
            f'ffprobe -v quiet -show_streams -select_streams v:0 -of json "{filename}"',
            shell=True).decode()
    fields = json.loads(result)['streams'][0]
    duration = fields['tags']['DURATION']
    hours,minutes,seconds_ms = duration.split(':')
    seconds,ms = seconds_ms.split('.')
    return (int(hours)*60*60 + int(minutes)*60 + int(seconds))


