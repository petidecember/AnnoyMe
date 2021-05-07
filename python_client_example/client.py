import asyncio
import socketio
import pyttsx3

tts = pyttsx3.init()
sio = socketio.AsyncClient()

@sio.event
async def connection():
    print('connection established')

@sio.event
async def numClients(data):
    print("Current # of clients: " + str(data))

@sio.event
async def messages(data):
    accumulator = ""
    for msg in data:
        accumulator += msg + '\n'
    print("Past msgs: " + accumulator)

@sio.event
async def synth(data):
    tts.say(data)
    tts.runAndWait()
    print("> " + data)

@sio.event
async def disconnect():
    print('disconnected from server')

async def main():
    await sio.connect('http://localhost:3000')
    await sio.wait()

if __name__ == '__main__':
    asyncio.run(main())

