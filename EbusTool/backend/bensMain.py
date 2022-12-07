from aiohttp import web
import traceback
import socketio
import csv
import webbrowser
from main import processCharacteristicsInputs, processGtfsInputs

sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins=['http://localhost:3000', 'http://localhost:8080'])
app = web.Application()
sio.attach(app)

async def index(request):
    """Serve the client-side application."""
    with open('build/index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

@sio.event
def connect(sid, environ):
    print("connect ", sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

@sio.event
async def customEventName(sid, data):
    # print("message ", data)    
    file1 = open("MyFile.txt", "r")
    print("Printing...")
    lineList = file1.readlines()
    print(lineList)
    file1.close()
    print(type(data))
    await sendMessage(lineList)

@sio.event
async def getAgencies(sid, data):
    with open('gtfs_sample_data_options.csv',mode = 'r') as file:
        # print(file)
        # print(csv.reader(file))
        uniqueId = 0
        agencies = []
        csvFile = csv.DictReader(file, fieldnames=None)
        for agency in csvFile:
            validVehicles = []
            if (agency["vehicle_types"].__contains__('Bus')):
                validVehicles.append('bus')
            if (agency["vehicle_types"].__contains__('Ferry')):
                validVehicles.append('ferry')
            name = agency["region_name"] + ' - ' + agency["agency_id"]  + ' - ' + agency["agency_name"]
            agency = {
                "agencyId": agency["agency_id"],
                "region": agency["region_name"],
                "dateAccessed": agency["date_accessed"] or "someDate",
                "id":  str(uniqueId),
                "state": agency["state"].upper(),
                "vehicleTypes" : validVehicles,
                "name": name,
            }
            agencies.append(agency)
            uniqueId += 1
        await sio.emit('agencyData', agencies)
    return



@sio.event
async def gtfs(sid, data):
    print("Message received...")
    await sendStatusUpdate("Checking GTFS files are valid...")
    try:         
        print("\n\n ---- DATA FROM GTFS INPUT VIEW: ")
        for item in data:
            print("{}: {}".format(item, data[item]))

        await processGtfsInputs(data, sendStatusUpdate, sendError, sendUpdatedGTFS)
        print("gtfs(): finished inside try block")

    except Exception as e: 
        await sendError('Error - Something went wrong trying to process GTFS: {}'.format(e))
        print("ERROR trying to runProgram")
        print(e)
    print("gtfs(): Finished.")

@sio.event
async def characteristics(sid, data):
    print("Message received...")
    try: 
        # Do all processing in here, yay!
        data['userInputsConstants']['num_min_periods'] = 60*24*8
        
        # Delete this line later:
        # data['userInputsConstants']['chargeLogic'] = "EOS"

        print("\n\n ---- DATA FROM CHARACTERISTICS VIEW:")
        for item in data:
            print("{}: {}".format(item, data[item]))
        
        await processCharacteristicsInputs(data['userInputsGTFS'], data['userInputsConstants'], sendStatusUpdate, sendError)

    except Exception as e: 
        await sendError('Error - Something went wrong trying to process characteristcs: {}'.format(e))
        traceback.print_exc()


@sio.event
async def checkImportPath(sid, data):
    if data is None or len(data) <= 0:
        # Run checks for the files in the path here.
        # Presuming they all work...:
        await sendMessage({'errMsg': 'Error - Invalid import path. Check the import path and try again.'})
    else:
        await sendMessage({'success': True})


@sio.event
async def saveImg(sid, data):
    placeholderFolder = "C:\Ben's Stuff\python-projects\KatieUI\Ebus_backend/Simulation_results/nsw_All_2019_12_06_Bus_B011_11/"
    folderAndFileName = placeholderFolder + data["fileName"]
    if data is not None and data["img"] is not None and data["fileName"] is not None:
        print("Data received.")
        with open(folderAndFileName, "wb") as fh:
            fh.write(data["img"])
    # print(data)
    return

# Methods for communicating to front end:

async def sendUpdatedGTFS(userInputsGTFS):
    await sio.emit('updatedGtfs', userInputsGTFS)

async def sendMessage(msg):
    await sio.emit('response', msg)

async def sendError(error):
    print(error)
    await sio.emit('error', error)

async def sendStatusUpdate(update):
    print(update)
    await sio.emit('update', update)

app.router.add_static('/static', 'build/static', show_index=True)
app.router.add_get('/', index)

def runUI():
    webbrowser.open('http://localhost:8080')
    web.run_app(app)

if __name__ == '__main__':
    runUI()


