# Generated by Django 2.0.6 on 2018-07-02 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("admin", "0025_auto_20180702_0939")]

    operations = [
        migrations.AlterField(
            model_name="attendancestate", name="default", field=models.BooleanField(default=False)
        )
    ]
