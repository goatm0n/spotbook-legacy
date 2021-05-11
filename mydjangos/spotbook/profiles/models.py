from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=60, blank=True, null=True)
    profile_picture = models.ImageField(blank=True, null=True, upload_to='images/')
    bio = models.TextField(blank=True, null=True)
    
