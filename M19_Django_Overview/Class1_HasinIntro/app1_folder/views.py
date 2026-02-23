from django.shortcuts import render

from django.http import HttpResponse    #I wrote

# Create your views here.
def myTestUrl(request):
    return HttpResponse("<h1>Hello World! from Django App 01</h1>"
                        "<br>Try URLs: <strong>app1/about/</strong>")

def aboutMeUrl(request):
    return HttpResponse("<h1>Md. Raihan Uddin Sarker</h1>"
                        "<br>1912115042 "
                        "<br>Uttara, "
                        "<br>Dhaka-1230")