from pydantic import BaseModel
#used for POST methods

#Table
class TeacherDetails (BaseModel):   #when I inherit this from BaseModel, its a DB Table now.
    #Cols
    name:str|None = 'No Name Provided'  #Nullable
    degree:str|None = 'No Degree info provided'
    teacherID:int   #NOT NULL

#Table
class Car(BaseModel):
    #Cols
    brand:str
    model:str
    color:str|None = 'White'
    type:str|None = None

