# This views file was created by me to show project initial homepage as I have used prefix for app1 so i needed localhost/ to show what I wanted
from django.shortcuts import render

from django.http import HttpResponse    #I wrote

# Create your views here.
def projectHome(request):
    return HttpResponse("Hello World! from Django Project")