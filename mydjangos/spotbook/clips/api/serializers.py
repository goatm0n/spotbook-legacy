from rest_framework import serializers
from clips.models import Clip

class ClipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clip
        fields = [
            'user',
            'spot',
            'textContent',
        ]