# Generated by Django 4.2.17 on 2025-01-08 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dementia', '0002_rename_person_conversation_person_one_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='upcoming_sessions',
            field=models.JSONField(default=list),
        ),
    ]
