from django.shortcuts import render
import requests
from rest_framework.response import Response


def send_data_to_socket(request):
  data = {'message': 'Hello from Django!'}
  response = requests.post('http://localhost:3001/send_data', json=data) 

  if response.status_code == 200:
    return Response("success", response.status_code)
  else:
    return Response(response, response.status_code)
