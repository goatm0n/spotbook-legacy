from django.contrib.gis.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Spot(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
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