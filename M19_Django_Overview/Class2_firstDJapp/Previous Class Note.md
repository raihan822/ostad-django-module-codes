# Pipenv note:
```bash
# One-time setup (if Different versions of python not yet installed)
pyenv install 3.11.14   # already done
export PATH="$HOME/.pyenv/shims:$PATH"  #see pyenv instruction
# Install Pipenv (or venv, poetry, uv etc..):
pyenv shell 3.11.14
pip install pipenv # for python's package version controlling
```
```bash
# Per project
cd project
pipenv --rm             # if needed to remove any previous env
pipenv --python 3.11    # make pipenv with python versions 3.11.* to the current directory
pipenv shell            # start and construct the virtual env
                        # `pipenv --rm`   #to remove the virtual env
python -V               # you should see Python 3.11.x
pipenv install django   # install django and necessary pkg specifically to this project env/local dir
                        # `pipenv uninstall django` # to uninstall the pkg
# Later when you share this project to different PC:
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
django-admin startproject PROJECT_NAME  # creates a new Project
python manage.py startapp APP_NAME  # creates a new App. (Can be Multiple, optional) #later Must link it: go to project ==> settings.py ==> installed apps[enlist the app folder]

# Initialize DB (django model):
python manage.py migrate    #Git Push
    - Any change to app-> models.py , You register the model DB to `admins.py` for admin access & CRUD op to DB. After everything, you must do:
    python manage.py makemigration  #Git Commit changes
    - then again:
    python manage.py migrate #Git Push
# create the first user (ADMIN USER):
python manage.py createsuperuser

# Finally, run project:
python manage.py runserver  # ctrl+c ==> to stop server
```