# Generated by Django 3.0.8 on 2020-09-10 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0004_auto_20200910_1352'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='options',
            field=models.CharField(blank=True, choices=[('first_level_price', 'Basic'), ('second_level_price', 'Intermediate'), ('third_level_price', 'Advanced')], max_length=30, null=True),
        ),
    ]
