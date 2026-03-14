# Module 19 (Django overview)
> Building Django app: 
>> Model, View, Template and URL routing

# Todo: Steps -
1. **Initial Setup:** [Done]
   1. Create Django Project `blog_project`
   2. Create App `blog`
   3. Register app in settings
2. **Database Layer (MODEL):** [Done]
   1. Create `Post` Model(DB) _[In App]_ with: `title`, `content`, `create_date`
3. **Admin Configuration [For the Database Model]:** [Done]
   1. Register `Post` Model in admin
   2. Create **_Super User_**
4. **Views Layer** [Done]
   1. Create View for _**listing Post**_
   2. Create View for _**Post details**_
5. **URL Configuration** [Done]
   1. Setup Project `URLs`
   2. Create blog `URLs`
   3. Connect Views to `URLs`running

- settings.py -> Database = [..] in here you can configure which SQL e
6. **Templates Layer** [Done]
   1. Create Templates Directory
   2. Create Posts list Template
   3. Create Post details Template
7. **Basic Styling** [Done]
   1. Setup static files
   2. Add basic CSS

Done.

# Solution:
```markdown
So, Quick flow of work:
# The Model-View-Template (MVT Django)
make `Project`+`App`[installed_apps<>] -> Make DB Class `Model(M)` -> admin.py permission+ super user creation -> `Views(V)` controller func for webpages -> URL config -> `Template(T)` for page decorations & CSS -> `Finish!`
```

2. Go to `App` -> `models.py`,
   1. 