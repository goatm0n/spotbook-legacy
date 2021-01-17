from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class Spot(models.Model):
    title = models.CharField(max_length=250)
    location = models.PointField(srid=4326)
    description = models.TextField()

    SKATEPARK = 'Skatepark'
    STREET = 'Street'
    DIY = 'D.I.Y'

    SPOTTYPES = [
        (SKATEPARK, ('Skatepark')),
        (STREET, ('Street')),
        (DIY, ('D.I.Y')),
    ]

    spotType = models.CharField(max_length=32, choices=SPOTTYPES)

    def __str__(self):
        return self.title