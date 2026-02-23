"""
URL configuration for project_folder project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# Importing Other App Views if necessary:
from app0_homepage import views #Django te sibling apps er shob file load korai thake path e, so ../app0 ebhabe jawa lage na. direct app name diyei dhuka jay

"""NOTE:
django has / route at the beginning so we don't write / at the beginning, 
but finish with / is good practice
"""

urlpatterns = [
    # Admin Panel! by Default:
    path('admin/', admin.site.urls),

    # What to show in Root URL:
    path('', views.homepage_view),  #chaile ei view ta direct project er vitor ei kora jae. but korlam na. alada app create korei korlam

    # What to show on Other URLs:
    path('app1/', include('app1_folder.urls'))  # App er full URL niye ashchi ekta prefix word add kore disi /app1/
    # include() takes a string path, not a Direct Python objects. so thats why I didnt need to import the app1 specifically. Django will do that later
]
