from django.contrib import admin

# Register your models here.

class PersonAdmin(admin.ModelAdmin):
    list_display = ('username', 'email') 