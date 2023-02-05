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
  "type": "service_account",
  "project_id": "hackviolet-2023",
  "private_key_id": "0d95e768301f788203360a3c314d1ff4b49f210f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/11gCF3viRm8w\n1Iw0ylabLaWDjPcEc6A0I+wGHeZ3yP6BtEavcLRxtyZA1LOhNY+IT7KQdWwnn4lS\nsqWJr1fQsrPMg9L1+99hQ0UvJawNVA5Ya4nBA5TO+n8VjQXKYnFbo85LxjYyrkVp\nu26RGToMXiJEeUN4u6BRYMzT49ERk7lRD2ytq8J/RAoQEGtqI2nrFw3vt8fP8etE\nh8+lqQrHPWKMUlYO1m93ZmpDlNfFq71gULXxKAfyxjD6d832PVO9rqVcj9VyN6mL\nYxcrzoLs504LP1GkJigaELXnP+MSo1KSLQ87GVnjRazuy6rqAi/iny6Koqr1YsM+\nFHDRwsPjAgMBAAECggEAMT7+9R6BKz9oeLD/Quf0Hoazt9bebFKgO/JCuvk++d3r\nU3FrOcslTxG0bK0NZaNBsry+um2iM3O1RTjd3L/Zu5W8KRJn+8RJ/gZOQsGZbpx2\nyETmylj4gL92Exqt81uc/OjKYtJBhHYPFIrMYcwHhjg99LTqWJpVl75RJk2TlD6V\nUsMRXkgyF8PkDKcbBf1SjUrDzhsRiwWlVh63mKu23uoG2uKab9ndz4+WP4nGVMUq\nH27wgnfn3Lu97HqdOufLhjgFgk/zWG6DJ4go//Erkilp01Za6X8ye+Z+p55zhaUF\nH6PNVmsNAPfgB7nJAwriKqvQqgqJCybhUqoxEpt5YQKBgQDm4eS8lGLPHLMx1mZ9\n3rd4CjAwAvWw8OO3zv7yVozneNZoHGC/V0p09r+SNlP0rIFsjykjYbm0ekmRMM2p\ndP3i0tjzAVqTmnciearMwUaWaeb3A82yZEwNOIGzYon663zJYOXOnwPMzHq1XZMk\ncsaWVDNVZhJeTdNhLH/MJl+MoQKBgQDUtiWv6x+xNx8/EUDQq1VqbKIKL1Vom2YO\nsukrG06iX01VdzACw779jAkUN5YWh8qkQcQAjm+AFY+NLo0ujDQbCoICJe1PSeNN\n6Bbqeu6dQ9/n0C5l5FQsrurbj8d49lWY8IBiXWZ1yMFZnYDqZayYv78xdK1Y1yEG\nB3QhAGFeAwKBgChJysxNaGCTtYFA1Gmqb4F25am7GnxhzJrKeBp5l+TcZS2NpiQ9\nazS1ygANkuDjKUJ0SM1vxCQGIsg/J+QmEhd+i3T8C34uOhO9/1vzbgnZOQBpnX8/\nmTXFYnyW+VTbus65JeDERrl6BP+Y8JAvpw+cacjBIvtpwTT3uuU43PuBAoGBAIUW\ntnvcZEbwU0eVlvU4zke5UqWGuiyqVm/J92P2QPwNHwjjexGvwhdIAAI7SVgtfFfL\nokQq2o7MbrYKM2G1bYCh0XhgnJuogmUjWvs5EYUqi7SyJ+WuuBABHYdk7Yy8rA/2\nIo3pHIuDoZ5dkuSV2yjziD/8Xd2hNNNd5IYlg8ZbAoGAUVobw1cII2zx7KbFiFDC\nIPzu5OgHO2bih/B1OEGUkOPdNv5ulUyG+HOJlrrHrVhGVRsnpjGQh5enNG6IGJcm\n91q0zbHH45QZ6oCuwTacGomhzV9/DZY4w2GBcyfAUegn4hP+2IrXTSQ262OKLs+E\nqXGSvoZpeML1YESnxpzpqqo=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-lezg2@hackviolet-2023.iam.gserviceaccount.com",
  "client_id": "112982398775381512907",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lezg2%40hackviolet-2023.iam.gserviceaccount.com"
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