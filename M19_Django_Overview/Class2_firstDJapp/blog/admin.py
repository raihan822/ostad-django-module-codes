from django.contrib import admin

# Register your models here.

"""Note: Register the Database to the admin permission, so that we can do CRUD operations 
on the Database
"""

# Giving access permission to my database to the Admin
from .models import Post    #models.py theke Post class import korlam
admin.site.register(Post)   #Admin (site)panel e Post DB model k include korlam and admin k access dilam