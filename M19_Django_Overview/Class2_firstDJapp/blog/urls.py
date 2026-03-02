from django.urls import path

from . import views #from current dir, import views
urlpatterns = [
    path('', views.home, name='home_page'),
    path('post-list/', views.post_list, name='post_list')
]

"""
'name' attr ta diye path chagne hoileo name remains like an id/variable name of that path. 
so later, you can use it inside html anchor tags href. 
    <a href="{% url 'download_pdf' %}">CLICK TO DOWNLOAD</a>
and path change hoile you just come here and change to new path. and locator name remains the same
"""
