# Generated by Django 2.0.2 on 2018-03-04 22:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("admin", "0005_auto_20180304_1137")]

    operations = [
        migrations.RenameField(
            model_name="attendance", old_name="attendance_state", new_name="attendancestate"
        )
    ]
