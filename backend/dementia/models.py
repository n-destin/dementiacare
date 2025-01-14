from django.db import models 
from datetime import date 
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.contrib import admin
# from django.contrib.postgres.fields import ArrayField
from django.core.validators import validate_email, RegexValidator, MinValueValidator, MaxValueValidator

MAX_LENGTH = 20
# models for entities


class GenderChoices(models.TextChoices):
    MALE = 'M', 'Male'
    FEMALE = 'F', 'Female'
    OTHER = 'O', 'Other'
    UNSPECIFIED = 'U', 'Unspecified'

class Person(AbstractUser):
    phone_number = models.CharField(max_length = 20, 
                                    validators=[
                                        RegexValidator(
                                            regex=r'^\+?1?\d{9,15}$', 
                                            message = "phone numbner must be entered in format '+00000000' up to 15 digits"
                                        )
                                    ])
    gender = models.CharField(max_length = 1, choices=GenderChoices.choices, default=GenderChoices.UNSPECIFIED, blank=True)
    age = models.IntegerField(default=0, blank= True, null=True)
    upcoming_sessions = models.JSONField(default=list) 
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='person_groups' 
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='person_user_permissions' 
    )
    # identity = models.TextChoices(value = [""])
    languages_spoken = models.JSONField(default=list)

    def __str__(self):
        return self.get_full_name()
    
class Relative(Person): # person to attach to the person
    related_patient = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="patient_relatives")
    relationship = models.TextField(default="", blank=True)
    therapists_additions = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"Relative: {self.get_full_name()}"

class Patient(Person):
    assigned_therapist = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="patients")
    diagnosis = models.JSONField(default=list, blank=True)
    medications = models.JSONField(default=list, blank=True)
    medical_conditions = models.JSONField(default=list, blank=True)
    surgical_history = models.JSONField(default=list, blank=True)
    family_medical_history = models.JSONField(default=list, blank=True)
    therapists_additions = models.JSONField(default=list, blank=True) 

    def __str__(self):
        return f"Patient: { self.get_full_name()}"

class Institution(Person):
    institution_name = models.CharField(max_length=100, default="", blank=True)
    about = models.TextField(default="", blank=True)
    website = models.URLField(default="", blank=True)

    def __str__(self):
        return f"Institution: {self.institution_name or self.username}"


class Therapist(Person):
    Credentials = models.TextField(default="", blank=True)
    Education = models.TextField(default="", blank=True)
    previous_positions = models.TextField(default="", blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    resume_pdf = models.FileField(upload_to='resumes/', null=True, blank=True)
    related_institutions = models.ManyToManyField(Institution, related_name="institution")
    specialization = models.CharField(max_length=100, default="", blank=True)
    # IntegerField has no max_length; use validators if needed:
    years_of_experience = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(80)]
    )
    services_provided = models.TextField(default="", blank=True)
    can_help_with = models.JSONField(
        default=list,
        blank=True
    )
    # 'locations' as an ArrayField of TextChoices is tricky; define a real field type:
    # locations = ArrayField(list
    # base_field=models.CharField(max_length=100),
    # default=list,
    # blank=True
    #     )
    patients = models.ManyToManyField(Patient, blank=True, related_name="therapists")

    def __str__(self):
        return f"Therapist: {self.username}"


class Couple(models.Model):
    partner_one = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name='couple_partner_one'
    )
    partner_two = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name='couple_partner_two'
    )
    relationship_length = models.IntegerField(default=0)
    therapist_additions = models.JSONField(
        default=list,
        blank=True
    )

    def __str__(self):
        return f"Couple: {self.partner_one.username} & {self.partner_two.username}"


# messaging models between clients and therapists

class Message(models.Model):
    sender = models.ForeignKey(Person, on_delete=models.CASCADE, default=1, related_name="sender")
    receiver = models.ForeignKey(Person, on_delete=models.CASCADE, default=1, related_name = "receiver")
    content = models.TextField(default="")
    date_sent = models.DateField(default=timezone.now)
    def __str__(self):
        return self.content
    
class TherapySession(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='sessions')
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='sessions')
    start_time = models.TimeField(default=timezone.now)
    end_time = models.TimeField(default=timezone.now)
    video_link = models.TextField(default="", blank=True)
    transcription = models.TextField(default="", blank=True)  # fixed the typo

    def __str__(self):
        return f"TherapySession: {self.patient.username} with {self.therapist.username}"


class Conversation(models.Model):
    person_one = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='conversations')
    person_one = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='conversations')
    people = models.ManyToManyField(Person, blank=True)
    creation_date = models.DateField(default=timezone.now)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return self.conversation_name or f"Conversation {self.id}"

# interactions 

class Review(models.Model):
    patient = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='reviews_as_patient')
    provider = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='reviews_as_provider')
    stars = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=5
    )
    comment = models.TextField(default="", blank=True)

    def __str__(self):
        return f"Review by {self.patient.username} of {self.provider.username} - {self.stars} stars"
