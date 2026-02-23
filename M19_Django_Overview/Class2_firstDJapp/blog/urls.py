from django.urls import path

from . import views #from current dir, import views
urlpatterns = [
    path('', views.home),
    path('post-list/', views.post_list)
    
]
