# Generated by Django 2.0.3 on 2018-03-23 08:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0018_auto_20180323_0906'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendance',
            name='lecture',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attendancess', to='admin.Lecture'),
        ),
    ]
