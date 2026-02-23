from django.urls import path    #imported by me
from . import views # imported by me

# Here i am just making a Zip pack of url for this particular APP folder all in one togather.
    # later you just import it into the master Project urls.py and enjoy all the routes made from here
urlpatterns = [
    path('', views.myTestUrl),
    path('about/', views.aboutMeUrl)
]



"""Guide:

from django.urls import path, include      #eta import kora lagbe
So, go to Project_folder => urls.py => urlpatterns=[...]:
    path(
        "separator_name/ dile better karon normal project url er sathe clash khabe noile. better to use a separator",
        include('app1_folder.urls')     #app folder er url.py ta link kore dibo.
    )
"""
