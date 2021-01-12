from rest_framework_gis.serializers import GeoFeatureModelSerializer
from backend.models import Spot

class SpotSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Spot
        geo_field = 'location'
        fields = ('title', 'location', 'spotType', 'description')