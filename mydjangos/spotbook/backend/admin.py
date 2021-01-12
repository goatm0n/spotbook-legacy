from django.contrib import admin
from . import models
from leaflet.admin import LeafletGeoAdmin

# Register your models here.
class SpotAdmin(LeafletGeoAdmin):
    pass

admin.site.register(models.Spot, SpotAdmin)