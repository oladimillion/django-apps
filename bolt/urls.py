from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^api/welcome/$', views.welcome, name="welcome"),
    url(r'^api/post/$', views.post, name="post"),
]
