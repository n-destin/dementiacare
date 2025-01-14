from django.contrib import admin
from .models import Person, Patient, Therapist

@admin.register(Therapist)
class TherapistAdmin(admin.ModelAdmin):
    list_display = list_display = ['username', 'first_name', "last_name", "password"]
    
@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', "last_name", "password"]

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ["username", "first_name", "last_name", "password", "assigned_therapist", "diagnosis", "medications", "medical_conditions", "surgical_history", "family_medical_history", "therapists_additions"]
