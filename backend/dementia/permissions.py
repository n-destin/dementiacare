from rest_framework.permissions import BasePermission
from .models import Therapist, Patient

class IsTherapist(BasePermission):
    """
    Custom permission to check if the user is a Therapist.
    """
    def has_permission(self, request, view):
        try:
            # If there's a Therapist with the same PK as request.user, it's a therapist
            return Therapist.objects.filter(pk=request.user.pk).exists()
        except:
            return False


class IsPatient(BasePermission):
    """
    Custom permission to check if the user is a Patient.
    """
    def has_permission(self, request, view):
        try:
            return Patient.objects.filter(pk=request.user.pk).exists()
        except:
            return False


class IsOwnerOrReadOnly(BasePermission):
    """
    For resources that are "owned" by a particular user, only that user can modify.
    Everyone else can only read.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        return obj.pk == request.user.pk  # or some other logic to define "ownership"
