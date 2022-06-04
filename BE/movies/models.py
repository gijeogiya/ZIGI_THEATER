from django.db import models
from django.conf import settings

class Genre(models.Model):
    name = models.CharField(max_length=50)
    
class Movie(models.Model):
    
    genre_ids = models.ManyToManyField(Genre,related_name='movies')
    poster_path = models.CharField(max_length=200, blank=True, null=True)
    adult = models.BooleanField()
    overview = models.TextField(null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    original_title = models.CharField(max_length=100,blank=True, null=True)
    original_language = models.CharField(max_length=100,blank=True, null=True)
    title = models.CharField(max_length=100)
    popularity = models.FloatField(null=True, blank=True)
    vote_count = models.IntegerField(null=True, blank=True)
    vote_average = models.FloatField(null=True, blank=True)

class Point(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='points')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='points')
    content = models.CharField(max_length=200)
    grade = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now = True)