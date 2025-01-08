import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
# from .authentication import generate_password
from django.core.mail import send_mail, send_mass_mail
from django.views.decorators.csrf import csrf_exempt
import os
from django.utils import timezone
from datetime import date
from .conferencing import generate_meeting_passcode
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
import eventlet
import socketio

socket_server = socketio.Server()
app = socketio.WSGIApp(socket_server, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

from .models import (
    Person, Patient, Therapist, Message, Conversation, TherapySession
)
from .serializers import (
    RegistrationSerializer, LoginSerializer, PersonSerializer,
    TherapistSerializer, PatientSerializer, MessageSerializer,
    ConversationSerializer, TherapySessionSerializer,
)
from .permissions import IsTherapist, IsPatient

REGISTRATION_OBJECT = {

}


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """
    Generic user registration endpoint.
    """
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  # Creates the new Person
        return Response( data=None, status=status.HTTP_201_CREATED )
    return Response(data = None, status=status.HTTP_404_NOT_FOUND)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def verify_email(receiver):
    password = generate_password()
    send_mail("authentication", password, "niyodestin73@gmail.com", [receiver], auth_user="niyodestin73@gmail.com", auth_password="1772003Mr.d")
    
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    print("reached here", request.data)
    """
    Logs in a user and returns a JWT token.
    """
    serializer = LoginSerializer(data=request.data)
    print(serializer.is_valid())
    if serializer.is_valid():
        tokens = serializer.save()  # create() returns JWT tokens
        print(tokens)
        return Response(tokens, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TherapySessionViewSet(viewsets.ModelViewSet):
    queryset = TherapySession.objects.all()
    serializer_class = TherapySessionSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsTherapist])
    def complete(self, request, pk=None):
        """
        Therapist can mark a session as complete or add notes.
        Example: /api/therapy-sessions/<session_id>/complete/
        """
        try:
            session = self.get_object()
            # You could add logic to mark the session as done, set end_time, etc.
            session.end_time = timezone.now()
            # uplioad video to aws and save the link to session.video_url
            session.save()
            return Response({"detail": "Session completed"}, status=status.HTTP_200_OK)
        except TherapySession.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], permission_classes=[IsTherapist])
    def schedule(self, request):
        """
        Patient schedules a session with a therapist.
        Example: /api/therapy-sessions/schedule/
        Body: { "therapist_id": ..., "start_time": ..., "end_time": ... }
        """

        therapist = Therapist.objects.get(pk=request.user.pk)  # The logged in user as Therapist
        patient_id = request.data.get('patient_id')
        start_time = request.data.get('start_time')
        end_time = request.data.get('end_time')
        # generate meeting passcode and room id 
        try:
            patient = Patient.objects.get(pk=patient_id)
        except Patient.DoesNotExist:
            return Response({"detail": "Invalid patient"}, status=status.HTTP_400_BAD_REQUEST)

        new_session = TherapySession.objects.create(
            patient=patient,
            therapist=therapist,
            start_time=start_time,
            end_time=end_time
        )
        
        return Response(
            TherapySessionSerializer(new_session).data,
            status=status.HTTP_201_CREATED
        )


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

    @api_view(["post"], )
    @permission_classes([AllowAny])
    @csrf_exempt
    def on_connection(self):
        return Response("someone connected", status=status.HTTP_200_OK)
    
    def get_queryset(self, request):
        """
        Limit the query to conversations where the current user is the owner.
        """
        conversations = Conversation.objects.all()
        return [conversation for conversation in conversations if request.user_id in [conversation.person_one, conversation.person_two] ]

    @action(detail=True, methods=['post'], url_path='send-message')
    def send_message(self, request, pk=None):
        """
        POST /api/conversations/<id>/send-message/
        Body: { "content": "Hello!" }
        """
        conversation = self.get_object()
        if request.user not in [conversation.person_one, conversation.person_two]:
            return Response({"detail": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)

        content = request.data.get('content', '')
        if not content:
            return Response({"detail": "No content"}, status=status.HTTP_400_BAD_REQUEST)

        # Create new Message
        msg = Message.objects.create(
            sender = request.user,
            receiver = conversation.person_one if conversation.person_one is not request.user else conversation.person_two,
            content=content
        )
        # Use socket
        conversation.messages.add(msg)
        conversation.save()
        return Response(
            {"detail": "Message sent", "message_id": msg.id},
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['get'])
    def my_conversations(self, request):
        """
        GET /api/conversations/my_conversations/
        Return all conversations for the logged in user.
        """
        conversations = Conversation.objects.filter(person=request.user)
        serializer = self.get_serializer(conversations, many=True)
        return Response(serializer.data)


class MessageViewSet(viewsets.ModelViewSet):
    """
    Generally, you might not want a fully open CRUD for messages.
    We'll illustrate read-only detail. 
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        # Return only messages by the current user or
        # messages in conversations the user owns.
        user = self.request.user
        return Message.objects.filter(person=user)  # simplistic approach
