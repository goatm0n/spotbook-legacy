from django.db import models
from django.conf import settings
from spots.models import Spot

User = settings.AUTH_USER_MODEL

class Clip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    spot = models.ForeignKey(Spot, on_delete=models.CASCADE)
    textContent = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.spot.title