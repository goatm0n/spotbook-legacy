# Generated by Django 3.1.5 on 2021-05-14 11:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('clips', '0003_clip_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='clip',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='clip_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='clip',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='ClipLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('clip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clips.clip')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
