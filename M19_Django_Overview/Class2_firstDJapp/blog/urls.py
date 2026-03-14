from django.urls import path

from . import views #from current dir, import views
urlpatterns = [
    path('', views.home, name='home_page'),
    path('post-list/', views.post_list, name='post_list'),  #name attr is like storing that routing in a var. for later one kick use inside Template
    path('post-details/<int:post_id>', views.post_details, name='post_details')
]

"""
'name' attr ta diye path chagne hoileo name remains like an id/variable name of that path. 
so later, you can use it inside html TEMPLATE anchor tags<a /> href. 
    <a href="{% url 'download_pdf' %}">CLICK TO DOWNLOAD</a>
    <a href="{% url 'post_details' %}">SEE POST DETAILS</a>, etc..
and path change hoile you just come here and change to new path. 
but locator `name` remains the same
"""
