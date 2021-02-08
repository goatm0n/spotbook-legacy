from rest_framework_gis.serializers import GeoFeatureModelSerializer
from spots.models import Spot

class SpotSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Spot
        geo_field = 'location'
        fields = ('title', 'location', 'spotType', 'description')