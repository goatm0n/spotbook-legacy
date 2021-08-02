from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

# Create your tests here.
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()

class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='cfe', email='cfe@email.com', password='password')
        self.user_b = User.objects.create_user(username='cfe-2', email='cfe-2@email.com', password='password')

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='password')
        return client

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user
        second = self.user_b
        first.profile.followers.add(second) # added a  follower
        second_user_following_whom = second.following.all()
        qs = second_user_following_whom.filter(user=first) # from a user, check other user is being followed
        self.assertTrue(qs.exists())
        first_user_following_no_one = first.following.all() # check new user is not following anyone
        self.assertFalse(first_user_following_no_one.exists())

    def test_follow_api_endpoint(self):
        client = self.get_client()
        client.force_authenticate(user=self.user)
        response = client.post(
            f"/profiles/api/{self.user_b.username}/follow",
            {"action": "follow"}
        )
        r_data = response.json()
        count = r_data.get("count")

        self.assertEqual(count, 1)

    def test_unfollow_api_endpoint(self):
        first = self.user
        second = self.user_b
        first.profile.followers.add(second)

        client = self.get_client()
        client.force_authenticate(user=self.user)
        response = client.post(
            f"/profiles/api/{self.user_b.username}/follow",
            {"action": "unfollow"}
        )
        r_data = response.json()
        count = r_data.get("count")

        self.assertEqual(count, 0)
        