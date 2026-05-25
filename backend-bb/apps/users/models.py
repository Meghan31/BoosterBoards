# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    avatar_url = models.URLField(blank=True)
    bio = models.TextField(blank=True, max_length=500)
    is_onboarded = models.BooleanField(default=False)

    # YouTube OAuth
    youtube_channel_id = models.CharField(max_length=100, blank=True)
    youtube_access_token = models.TextField(blank=True)
    youtube_refresh_token = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.email

    @property
    def has_youtube_connected(self):
        return bool(self.youtube_channel_id)