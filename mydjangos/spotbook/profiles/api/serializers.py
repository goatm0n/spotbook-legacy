from rest_framework import serializers
from profiles.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'user',
            'full_name',
            'profile_picture',
            'bio',
        ]

class ProfileFollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['followers']