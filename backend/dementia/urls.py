# myapp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConversationViewSet
# from socketview import send_data_to_socket

from .views import (
    register_view, login_view,
    TherapySessionViewSet, ConversationViewSet,
    MessageViewSet
)

router = DefaultRouter()
router.register(r'therapy-sessions', TherapySessionViewSet, basename='therapy-session')
router.register(r'conversations', ConversationViewSet, basename='conversation')
router.register(r'messages', MessageViewSet, basename='message')


urlpatterns = [
    path('chat/messages/', ConversationViewSet.on_connection, name='send_data'),
    path('authenticate/register/<str:role>/', register_view, name='register'),
    path('authenticate/login/', login_view, name='login'),
    path("conversations/all", ConversationViewSet.my_conversations, name = "get conversations"),
    path('', include(router.urls)),
    
]
