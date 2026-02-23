from django.shortcuts import render


from django.http import HttpResponse
# Create your views here.
def home(request):
    return HttpResponse("<h1>Welcome to Homepage Class2</h1>")


from .models import Post #imported the Table 'Post' Class
def post_list(request):
    """note:
        Post is the Table. in code it is Class
        Post.objects here, Objects means Rows of the Table
        all_posts=Post.objects.all()
        all_posts.title means only title column gula

    so, SELECT title FROM Post
    """
    
    all_posts = Post.objects.all()
    result = ""
    for post in all_posts:
        result += post.title + "<br>"   #to show the tiles of the Post Table niche niche

    #after the result string is ready, we send it to frontend:
    return HttpResponse(f"<h1>Post List</h1><br>{result}")
def post_details(request):
    return HttpResponse("<h1>Post Details</h1>")
