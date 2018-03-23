# Generated by Django 2.0.3 on 2018-03-23 08:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0016_auto_20180322_1631'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendance',
            name='attendancestate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='admin.AttendanceState'),
        ),
        migrations.AlterField(
            model_name='group',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='admin.Course'),
        ),
        migrations.AlterField(
            model_name='lecture',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='admin.Course'),
        ),
    ]
