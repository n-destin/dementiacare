# myapp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from socketview import send_data_to_socket

from .views import (
    register_view, login_view,
    TherapySessionViewSet, ConversationViewSet,
    MessageViewSet
)

router = DefaultRouter()
router.register(r'therapy-sessions', TherapySessionViewSet, basename='therapy-session')
router.register(r'conversations', ConversationViewSet, basename='conversation')
router.register(r'messages', MessageViewSet, basename='message')
# ... you can also register your Person/Patient/Therapist viewsets if you want

urlpatterns = [
    path('send_data/', send_data_to_socket, name='send_data'),
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('', include(router.urls)),
]
