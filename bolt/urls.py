from django.conf.urls import url
from mysite.settings  import settings
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^api/welcome/$', views.welcome, name="welcome"),
    url(r'^api/post/$', views.post, name="post"),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
]
