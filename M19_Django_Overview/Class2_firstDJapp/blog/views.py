from django.shortcuts import render


from django.http import HttpResponse
# Create your views here.
def home(request):
    return HttpResponse("<h1>Welcome to Homepage (Django-Class2)</h1>")


from .models import Post #imported the Table(Class) 'Post'
'''
def post_list(request):
    """note:
        Post is the Table. in the code it is a Class
        Post.objects ==> Objects means Rows of the Table
        all_posts=Post.objects.all()    #means all rows
        all_posts.title means only title Column

    so, SQL: `SELECT title FROM Post`
    """
    
    all_posts = Post.objects.all()
    result = ""
    for post in all_posts:
        result += post.title + "<br>"   #to show the tiles of the Post Table niche niche

    #after the result string is ready, we send it to frontend:
    return HttpResponse(f"<h1>Post List</h1><br>{result}")
'''
def post_list(request):
    """note:
        Post is the Table. in the code it is a Class
        Post.objects ==> Objects means Rows of the Table
        all_posts=Post.objects.all()    #means all rows
        all_posts.title means only title Column

    so, SQL: `SELECT title FROM Post`
    """
    
    all_posts = Post.objects.all()
    data = {
        'all_posts': all_posts
    }
    #render(kon request er jonno?, kon html?, kon data{} diye?)
    return render(request, 'post_list.html', data)    #ei request er jonno oi html e required field gula fill kore render kore rendered html ta send korbe frontend hishebe.So, render(kon request er jonno?, kon html?, kon data{} diye?)

def post_details(request, post_id): #its URL_PARAMETER, like Reactjs. 
    # Go to routings url.py: route/<type: exact_same_parm_name> of this function to match.
    """note:
        Post is the Table. in the code it is a Class
        Post.objects ==> Objects means Rows of the Table
        all_posts=Post.objects.all()    #means all rows
        all_posts.title means only title Column

    so, SQL: `SELECT title FROM Post`
    """

    a_post = Post.objects.get(id=post_id)  # ebar ar .all() chai na. just get the post details WHERE id = `post_id`
    post_title = a_post.title
    post_details = a_post.content

    # result = f"{post_title}<br >{post_details}"
    # return HttpResponse(f"<h1>Post Details</h1><br> {result}")

    data = {
        'post_id': post_id,
        'post_title': post_title,
        'post_details': post_details,
    }
    return render(request, 'post_details.html', data)
