# Generated by Django 2.1 on 2018-08-30 15:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0030_membership_prepaid_cnt'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='membership',
            options={'ordering': ['client__surname', 'client__name']},
        ),
    ]
