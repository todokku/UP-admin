# Generated by Django 2.1 on 2018-08-17 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("admin", "0028_auto_20180703_0827")]

    operations = [
        migrations.AddField(
            model_name="attendancestate", name="excused", field=models.BooleanField(default=False)
        )
    ]
