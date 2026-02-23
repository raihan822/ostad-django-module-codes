from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def homepage_view(request):
    return HttpResponse("<h2>This is HOMEPAGE</h2>"
                        "<h1 style='color:red;'>This is the First Django Testing</h1>"
                        "<br>Try URLs:- "
                        "<br><strong>admin/</strong> [for Django Admin Panel]"
                        "<br><strong>app1/</strong>")
