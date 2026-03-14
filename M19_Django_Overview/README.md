# Quick rule to remember
- Pipfile = what you want
- Pipfile.lock = what you get
> Next time you do `pipenv install` and this will install everything required to go with the project on other PC.
>> Just like `npm install` on Vite-React

# Pipenv note:
```bash
# One-time setup (if Different versions of python not yet installed)
pyenv install 3.11.14   # already done on Linux OS
export PATH="$HOME/.pyenv/shims:$PATH"  #see pyenv instruction
# Install Pipenv (or venv, poetry, uv etc..):
pyenv shell 3.11.14
pip install pipenv # for python's package version controlling
```
```bash
# Per project
cd project
pipenv --venv           # to see if any pipenv already initialised in the dir.
pipenv --rm             # if needed to remove any old env
pipenv --python 3.11    # make pipenv with python versions 3.11.* to the current directory
pipenv shell            # start and construct the virtual env
                        # `pipenv --rm`   #to remove the virtual env
python -V               # you should see Python 3.11.x
pipenv install django   # install django and necessary pkg specifically to this project env/local dir
                        # `pipenv uninstall django` # to uninstall the pkg
# LATER WHEN YOU SHARE THIS PROJECT to different PC:
# -first install the required python version specified in pipfile. then,
cd project
pipenv install  # this will install all the necessary pkg to run the project
pipenv shell
```

```bash
# HOW TO RUN DJANGO PROJECT:
# 0. cd project
# 1. pipenv shell
# 2. pipenv install django. then,
django-admin startproject PROJECT_NAME . # creates a new Project
python manage.py startapp APP_NAME  # creates a new App. (Can be Multiple, optional) #later Must link it: go to project ==> settings.py ==> installed apps[enlist the app folder]

# Initialize DB (django model):
python manage.py migrate  # git push

> after that, any change to model.py:
  python manage.py makemigrations # git commit
  python manage.py migrate  # git push

# Later, create the first user (ADMIN USER):
python manage.py createsuperuser

# Finally, run project:
python manage.py runserver  # ctrl+c ==> to stop server
```

# So, Quick flow of work:
```markdown
# The Model-View-Template (MVT Django)
make `Project`+`App`[installed_apps<>] 
    -> Make DB Class `Model(M)` 
        -> admin.py permission+ superuser creation 
            -> `Views(V)` controller func for webpages (app views.py)
                -> URL config -> app `template(T)/` for page HTMLs, app `static/` for CSS files
-> `Finish!`
```

# Django Note:
- app banaile sheta project er `settings.py` e `INSTALLED_APP` e add kore nite hoy to connect it to project
- [in app] `views` e control function thakbe.. kon `template` ta kon func call e show hobe shei logic.
- [in app] `templete/html` orthat, views er `func` nijei UI `render` korbe.
- [in app] `static/css` dir te CSS file gulo thakbe ja html e load kore style.css boshate hobe.

- views er func gula receive korbe `request` or r, and `return` korbe as a response `httpresponse`/ ba `render` a `templete` UI

- app folder e `urls.py` file nije create kore nite hoy. then pore oi file ta project `urls` file e  `path` e `include` kore nite hoy
- URLs e thakbe routings. ja `urlpatterns[]` er vitor `'' -> root`, `'', include("string py file name")` ebhabe thakbe. [include er `string location` file ta import kora lage na. Django nije kore nae]

# Important Django library imports and their tasks:


