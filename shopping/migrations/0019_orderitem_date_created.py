# Generated by Django 3.0.8 on 2020-09-12 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0018_orderitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
