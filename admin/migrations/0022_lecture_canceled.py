# Generated by Django 2.0.4 on 2018-04-07 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("admin", "0021_auto_20180407_1059")]

    operations = [
        migrations.AddField(
            model_name="lecture",
            name="canceled",
            field=models.BooleanField(default=False),
            preserve_default=False,
        )
    ]
