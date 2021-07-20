from django.test import TestCase

# Create your tests here.
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()

class ProfileTestCase(TestCase):
    def setUp(self):
        self.user_a = User.objects.create_user(username='cfe', email='cfe@email.com', password='password')
        self.user_b = User.objects.create_user(username='cfe-2', email='cfe-2@email.com', password='password')

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user_a
        second = self.user_b
        first.profile.followers.add(second) # added a  follower
        second_user_following_whom = second.following.all()
        qs = second.following.filter(user=first) # from a user, check other user is being followed
        self.assertTrue(qs.exists())
        first_user_following_no_one = first.following.all() # check new user is not following anyone
        self.assertFalse(first_user_following_no_one.exists())
