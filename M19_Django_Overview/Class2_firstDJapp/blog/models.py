# 1. Create `Post` Model(DB) _[In App]_ with: `title`, `content`, `create_date`
from django.db import models

# Create your models here..

# Table Name: `Post`
class Post (models.Model):
    # Django columns `models.Type()` are byDefault set as NOT NULL.
    # Columns: title, content, create_date
    title = models.CharField(max_length=255) #SQL: VARCHAR, length is mandatory field
    content = models.TextField() #SQL: TEXT
    create_date = models.DateTimeField() #SQL: DATETIME

    # an example extra column with extra attributes:
    extra_col = models.CharField(max_length=255, null=True) #extra attribute, nullable



"""Note:---------------------------------------------------------------------
- after making a Model Class, you run
`python manage.py runserver`    # will detect the new changes before running

- settings.py -> Database = [..] in here you can configure which SQL engine you want to use, SQLAlchemy/Django DRF etc...
# Below command ta UNIVERSAL. Django project banailei ekbar korte hoy.
# like GIT PUSH:
`pyton manage.py migrate`   # will initialize Django's internal built in tables

# Now to commit my changes in Models.py:
# like GIT COMMIT:
`python manage.py makemigrations`   # this creates a folder named, migrations with initial.py

# After any changes, again do: [like GIT PUSH]:
`pyton manage.py migrate`   # will initialize Django's internal built in tables and/or, push changes.


"""