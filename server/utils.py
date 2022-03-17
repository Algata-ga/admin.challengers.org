import time

def getFilename(metadata):
    name = metadata['title'].replace(' ','')+str(int(time.time()))
    return name
