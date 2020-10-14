# Generated by Django 3.0.8 on 2020-09-12 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0019_orderitem_date_created'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShipppingAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('country', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=40)),
                ('address', models.CharField(max_length=200)),
                ('zipcode', models.CharField(max_length=50)),
            ],
        ),
    ]
