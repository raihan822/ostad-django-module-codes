## Fast api stack: fastapi, pydentic, python-multipart, uvicorn

from fastapi import FastAPI

my_app = FastAPI() #fastapi object to make api routes
@my_app.get('/')    # HOMEPAGE route
def read_root():
    return {
        'key_msg':'Hello, fastapi'
    }   #returns like json object key:val


#-------------------------------------------------------------------------
# GET and POST methods:
@my_app.get('/pc-info')
def pc_info():
    return {
        'category': 'Laptop',
        'cpu':'i5 8265U',
        'ram':12,
        'gpu':'mx150'
    }

## for post method we need data verification before input through API.
## so we need PYDENTIC for data validation!

from pydantic import BaseModel # BaseModel ta hocche ekta table (database table) and, table er attribute gula hobe col.
# Orthat, Table== class, class_attributes == columns of table 
class NewDevice(BaseModel):    #like a database table
        category:str    #these are variables as Table Column names
        cpu:str
        ram:int
        gpu:str
### ei schema data type er baire kono vul type er data dilei pydentic error warning dibe.

@my_app.post('/add-device')
def add_device(new_device:NewDevice):  # NewDevice class type er 1ta data ashbe, jekhane oitar vitor e cat, cpu, ram etc thakbe. Class is a ekta value with its object.
    return {
        'cat':new_device.category,  #oi pydentic model class tar category type, cpu type, ram type etc..
        'cpu':new_device.cpu,
        'ram':new_device.ram,
        'gpu':new_device.gpu
    }


#-------------------------------------------------------------------------
# PATH PARAMETER and QUERY PARAMETER:
## PATH PARAMETER hocche 'url/<direct parameter value>'
## ar Query parameter holo: url/?name=X&roll=Y eije URL e direct likhe dei, ?, & & diye etai query kora

### path parameter:
@my_app.get('/usr/{usr_id}')
def get_user(usr_id:int):
    return {
        'usr_id': usr_id,
        'msg': f'Welcome! user no -> {usr_id}'
    }
#   'http://127.0.0.1:8000/usr/366'

### Query paramter:     /search?usr_id=5432
@my_app.get('/search')
def search_user(usr_id:int):
    return {
        'usr_id': usr_id,
        'msg': f'Start Searching for user ID -> {usr_id}?'
    }
#   'http://127.0.0.1:8000/search?usr_id=366'

### So, dui bhabei URL theke value catch kora jay. you can do the same within frontend

#-------------------------------------------------------------------------
# Optional parameters and default values:
## parameter e default value boshano. na boshaile mandetory hoye jay
## Pydentic class o optional kora jay default value boshiye.
from typing import Optional
class Student(BaseModel):
    name: Optional[str] = 'Not Present'
    roll:int
    section:str | None = 'No section provided'  # evabeo lekha jay
    age:int
    fav_subject: Optional[str] = None

"""
# easier, and dont need import! with Or operator.
class Student(BaseModel):
    name: str | None = 'Not Present'
    roll: int
    section: str
    fav_subject: str | None = None
"""

#-------------------------------------------------------------------------
# Custom Error handling with error handler
from fastapi import HTTPException
@my_app.post("/add-student")
def add_student(obj:Student):
    if obj.age < 18:
        raise HTTPException(status_code=400, detail='Age must be greater than 18')
    return {
        'status':'success',
        'age':obj.age,
        'name': obj.name
    }

# URL params, Query Params are GET method thing with some input on the URL directly.
# Where as POST method URL Params ba Query Params er moto Na, je link er moddhei pathano direct pathano jabe.
# its more secured and 'Request Body' er maddhome pathate hoy and link e hidden thakbe.
# so more security. thats POST method.


#-------------------------------------------------------------------------
# Returning HTML or Text
from fastapi.responses import HTMLResponse, PlainTextResponse
@my_app.get("/get-txt", response_class=PlainTextResponse)
def get_text():
    return "Hello world, This is plain text returned"

@my_app.get('/get-html', response_class=HTMLResponse)
def get_html():
    return """
<html>
    <head>
        <title>Test HTML</title>
    </head>
    <body>
        <h1>Boro text</h1>
        <p/>This is a sample paragram, check this one<p>
    </body>
</html>
"""
#-------------------------------------------------------------------------
# FastApi folder structure:
"""
fastapi_APP/
    main.py             #main controller
    routes/ users.py    #api routes here
    models/ user.py     #database model, Pydentic models
"""
# Separation of py scripts:---
from routes import my_routes
my_app.include_router(my_routes.router)     #so my_app er sathe oi py file er routes gulao connected hoye gelo

# right when you link and import the modules, it starts working and all the routes from route's py and models from model's py will be seen live from now


#-------------------------------------------------------------------------
# Uploading a file through API

# First create a folder to store them: 'uploads' folder.
import shutil
from fastapi import UploadFile, File    #UploadFile is the type, and File is the default value, for File Uploading.
@my_app.post('/uploadfile')
def upload_file(my_file_obj:UploadFile = File(...)):   #UploadFile is the type, and File is the default value, for File Uploading.
    #ei default File() type tar kichu useful methods ache use kora jay, jemon obj.file=the file itself, obj.filename=filename
    with open(f"uploads/{my_file_obj.filename}", "wb") as buffer:
        shutil.copyfileobj(my_file_obj.file,buffer)
        #Done
    return {
        'filename':my_file_obj.filename #ki file upload hoise tar nam return kore dilam to show in frontend
    }
# Declaimer!: you have to install: pip install python-multipart


#-------------------------------------------------------------------------
# Forms in Fastapi (for taking user input, jemon: login info etc)
from fastapi import Form
@my_app.post('/login')
def login(username:str=Form(...), password:str=Form(...)):
    if username=='raihan'and password=='4444':
        return {
            'success': 'api successful',
            'msg': f'successfully loged in!, welcome {username}'
        }
    else:
        return{
            'success': 'api successful',
            'msg': f'login failed. Invalid Username or Pass!'
        }
    
#-------------------------------------------------------------------------
# Simple Authentication system:
fake_usr_db = {
    'akif':123,
    'sakib':321,
    'kaji':111,
    'tanvir':222,
    'rafat':333,
    'raihan':444
}
@my_app.post('/fake-login')
def fake_login(username:str=File(...), usr_password:int=File(...)):
    if username not in fake_usr_db:
        return {
            'msg':'user not found'
        }
    if fake_usr_db[username] != usr_password:
        return {
            'msg': 'wrong password'
        }
    return {
        'msg': f'Welcome {username}, login sucessfull'
    }



#-------------------------------------------------------------------------
# 13-Making Background Tasks in fastapi
from fastapi import BackgroundTasks

def a_recurring_task(email:str):
    with open(f'uploads/emails.txt', 'a') as file:
        file.write(f'Email is sent to {email}\n')

@my_app.post('/register_bg')
def bg_task(email:str, bg_task:BackgroundTasks):
    bg_task.add_task(a_recurring_task, email)   #main thread theke ber hoye alada ekta thread e background task hishebe kaj korte thakbe.
    return {
        'msg':f'user registered with {email}'
    }

#-------------------------------------------------------------------------
# Using Environment Variables (.env)
##make a .env file and keep secrects there with key names.
""".env
GROQ_API=asdlfjasdlfja;dsf
DB_PASS=fasdfaweirawer
etc...
"""
##Then .env file tha .gitignore e diye dibo, jate upload na hoy

'pip install python-dotenv'
from dotenv import load_dotenv
load_dotenv()   # .env file er keys gula os env var er moto kore load hoye jabe
# jehetu load_dotenv() eta .env file er keys gula k OS level er env er hishebe load kore so,
import os   #abar actually os env var thakle load dotenv ta comment out kore dibo? This is the universal solution.

@my_app.get('/secret-info')
def read_secrets():
    secret_key = os.getenv('SAMPLE_KEY')
    return {
        'msg':f'WARNING! Sensitive data: {secret_key}'
    }