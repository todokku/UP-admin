# Generated by Django 2.0.3 on 2018-03-07 16:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("admin", "0009_auto_20180305_1613")]

    operations = [
        migrations.CreateModel(
            name="Membership",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("start", models.DateTimeField()),
                ("end", models.DateTimeField(blank=True, null=True)),
                (
                    "client",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="memberships",
                        to="admin.Client",
                    ),
                ),
                (
                    "group",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="memberships",
                        to="admin.Group",
                    ),
                ),
            ],
        ),
        migrations.RemoveField(model_name="memberof", name="client"),
        migrations.RemoveField(model_name="memberof", name="group"),
        migrations.DeleteModel(name="MemberOf"),
    ]
