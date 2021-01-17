from django.contrib import admin
from .models import Spot
from leaflet.admin import LeafletGeoAdmin


class SpotAdmin(LeafletGeoAdmin):
    pass

admin.site.register(Spot, SpotAdmin)
