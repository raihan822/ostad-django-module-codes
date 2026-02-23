from django.db import models

# Create your models here..

# Table Name: `Post`
class Post (models.Model):
    # Djanog columns `models.Type()` are byDefault set as NOT NULL.
    # Columns: title, content, create_date
    title = models.CharField(max_length=255) #SQL: VARCHARD alternative
    content = models.TextField() #SQL: TEXT alternative
    create_date = models.DateTimeField() #SQL: DATETIME alternative

    # an example extra column with extra attributes:
    extra_col = models.CharField(max_length=255, null=True) #extra attribute



"""Note:---------------------------------------------------------------------
- after making a Model Class, you run
`python manage.py runserver`    # will detect the new changes before running

- settings.py -> Database = [..] in here you can configure which SQL engine you want to use, SQLAlchemy/Django DRF etc...
# Below command ta universal. Djanog project banailei ekbar korte hoy.
# like GIT PUSH:
`pyton manage.py migrate`   # will initialize Django's internal built in tables

# Now to commit my changes in Models.py:
# like GIT COMMIT:
`python manage.py makemigrations`   # this creates a folder named, migrations with initial.py

# like GIT PUSH:
`pyton manage.py migrate`   # will initialize Django's internal built in tables


"""