from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from json import loads

# Create your views here.


def index(request, template_name="index.html"):
    return render(request, template_name)


def welcome(request):
    data = { "msg": "Welcome!\nAsk me anything" }
    return JsonResponse(data)


@csrf_exempt
def post(request):
    json = (request.POST["post"])
    json = loads(json)
    print(json)
    print(type(json))

    data = {
        "gotten": "worked"
    }

    return JsonResponse(data)
