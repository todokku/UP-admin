# Generated by Django 2.0.2 on 2018-03-04 23:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("admin", "0007_auto_20180304_2342")]

    operations = [
        migrations.RenameField(
            model_name="attendance", old_name="attendance_state", new_name="attendancestate"
        )
    ]
