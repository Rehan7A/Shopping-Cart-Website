# Generated by Django 3.0.8 on 2020-09-10 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('price', models.IntegerField()),
                ('title', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
    ]
