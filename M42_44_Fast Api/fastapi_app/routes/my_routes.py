from fastapi import APIRouter
router = APIRouter()    #router obj as like App object on the main py

@router.get('/about-me')
def my_details():
    return {
        'name':'Md. Raihan Uddin Sarker',
        'uni':'NSU',
        'ID':1912115,
        'passing_yr':2024,
        'isGraduated':True
    }

# using models DB pydentic and making a route here to let it work on main.py
# user.py models has TeacherDetails and Car tables (as Classes):
from models import user

#pydentic DB use korle POST method
@router.post('/get-teacher-info')
def get_teacher(t_info:user.TeacherDetails):
    return {
        'name':t_info.name,
        'degree':t_info.degree,
        't_id':t_info.teacherID
    }

#pydentic DB use korle POST method
@router.post('/car-info')
def get_car(c_info:user.Car):
    return {
        'brand': c_info.brand,
        'model': c_info.model,
        'color': c_info.color,
        'type': c_info.type
    }

#user input ashle POST method e use kora hoy
# but if u forcely wanna use GET method instead, you can pass the data in the query string

# @router.get('/car-info')
# def get_car(brand: str, model: str, color: str | None = None, type:str|None=None):
#     # Data is passed in the URL: /car-info?brand=Toyota&model=Camry
#     return {
#         'brand': brand,
#         'model': model,
#         'color': color,
#         'type': type
#     }

