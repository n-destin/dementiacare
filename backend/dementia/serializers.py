# myapp/serializers.py
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404

from .models import (
    Person, Therapist, Patient, Relative, Institution, 
    Message, Conversation, TherapySession
)

class RegistrationSerializer(serializers.ModelSerializer):
    """
    For user registration. We'll assume a generic sign-up.
    You might want separate sign-up flows for therapist vs. patient, etc.
    """
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = Therapist
        fields = ['username', 'password', 'password2', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):

        role = self.context.get('role')

        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = None
        if role == "patient":
            user = Patient(**validated_data)
        else:
            user = Therapist(**validated_data)
        user.password = make_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user = Person.objects.get(username = username)
        if not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")
        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        """
        Generate JWT token upon login. 
        We'll store user in validated_data['user'] from validate().
        """
        user = validated_data['user']
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'username': user.username,
        }

# ------------------------------------------
# Example: Person, Patient, Therapist, etc.
# ------------------------------------------

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'gender', 'age', 'languages_spoken',
        ]

class TherapistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Therapist
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

# ------------------------------------------
# Chat & Sessions
# ------------------------------------------

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = '__all__'

class TherapySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TherapySession
        fields = ['patient', 'therapist', 'start_time']
