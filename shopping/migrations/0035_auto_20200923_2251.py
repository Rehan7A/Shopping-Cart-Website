# Generated by Django 3.0.8 on 2020-09-23 17:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0034_auto_20200922_1450'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='shopping.Order'),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='shopping.Product'),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='size',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]