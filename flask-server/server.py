import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

from pyicloud import PyiCloudService
import getpass
from config import govee_key
from math import radians, cos, sin, asin, sqrt
import datetime
import requests
import json
import asyncio
# import socketio
import time

app = Flask(__name__)


cred = credentials.Certificate({

})


initialize_app(cred)

db = firestore.client()
ref = db.collection('switches')

status = ref.document("e1:66:34:20:03:6d:62:62").get().get("State")

# requests.get("http://127.0.0.1:5000/continousChaos")



# Initialize Firestore DB
# cred = credentials.Certificate('key.json')
# default_app = initialize_app(cred)
# db = firestore.client()
# todo_ref = db.collection('todos')

def distance(lat1, lat2, lon1, lon2):
         
    # The math module contains a function named
    # radians which converts from degrees to radians.
    lon1 = radians(lon1)
    lon2 = radians(lon2)
    lat1 = radians(lat1)
    lat2 = radians(lat2)
    
    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2

    c = 2 * asin(sqrt(a))
    
    # Radius of earth in kilometers. Use 3956 for miles
    r = c*20925721.784777
    
    # calculate the result
    return r

@app.route("/power-down")
def members():
    global status

    # email = input('Email: ')
    password = getpass.getpass("Password: ")

    api = PyiCloudService('sakethraj122@gmail.com', password)

    status = ref.document("e1:66:34:20:03:6d:62:62").get().get("State")
    print(str(status))

    print(api.data)

    now = datetime.datetime.now()
    # print('time now ' + str(now))
    five_pm = now.replace(hour=17, minute=0, second=0, microsecond=0)
    five_am = now.replace(hour=5, minute=0, second=0, microsecond=0)
    # print(now > five_pm)
    # print(now < five_am)


    url = 'https://developer-api.govee.com/v1'
    headers = {"content-type": "application/json", 'Govee-API-Key': govee_key }
    payload = {
        'device':'e1:66:34:20:03:6d:62:62',
        'model':'H5081',
        'cmd': {
            'name': 'turn',
            'value': 'off'
        }
    }
    requests.put(url + '/devices/control', data=json.dumps(payload), headers=headers)
    status = "off"
    ref.document("e1:66:34:20:03:6d:62:62").update({'State':status})

    while True:

        status = ref.document("e1:66:34:20:03:6d:62:62").get().get("State")
        print(str(status))

        latitude = api.devices[3].location()['latitude']
        longitude = api.devices[3].location()['longitude']
        print('coordinates: (' + str(latitude) + '', '' + str(longitude) + ')')

        lat1=37.23026131710311
        lon1=-80.42241997422919
        lat2=latitude
        lon2=longitude

        # The math module contains a function named
        # radians which converts from degrees to radians.
        lon1 = radians(lon1)
        lon2 = radians(lon2)
        lat1 = radians(lat1)
        lat2 = radians(lat2)
        
        # Haversine formula
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2

        c = 2 * asin(sqrt(a))
        
        # Radius of earth in kilometers. Use 3956 for miles
        distance = c*20925721.784777
            

        # distance = distance(lat1=37.24243167545431, lon1=-80.42904638540682, lat2=latitude, lon2=longitude)
        print(str(distance))
        print('**************************************************************')


        if now > five_pm and now < five_am and distance <= 20:
            # print('in range and in time')

            if status == "off":
                payload = {
                    'device':'e1:66:34:20:03:6d:62:62',
                    'model':'H5081',
                    'cmd': {
                        'name': 'turn',
                        'value': 'on'
                    }
                }

                print(requests.put(url + '/devices/control', data=json.dumps(payload), headers=headers).content)
                status = "on"
                ref.document("e1:66:34:20:03:6d:62:62").update({'State':status})
            # else:
                # print('already on') 


        else:
            # print('not in range or not on time')

            if status == "on":
                payload = {
                    'device':'e1:66:34:20:03:6d:62:62',
                    'model':'H5081',
                    'cmd': {
                        'name': 'turn',
                        'value': 'off'
                    }
                }

                print(requests.put(url + '/devices/control', data=json.dumps(payload), headers=headers).content)
                status = "off"
                ref.document("e1:66:34:20:03:6d:62:62").update({'State':status})

            # time.sleep(2)
            # else:
                # print('already off') 

    return {"status": status}



if __name__ =="__main__":
    app.run(debug=True)
