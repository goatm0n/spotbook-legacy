# Generated by Django 3.1.5 on 2021-05-16 23:33

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('clips', '0004_auto_20210515_0927'),
    ]

    operations = [
        migrations.AddField(
            model_name='clip',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
