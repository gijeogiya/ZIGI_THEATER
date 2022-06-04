from rest_framework import serializers
from .models import Movie,Genre, Point
from django.contrib.auth import get_user_model


class MovieSerializer(serializers.ModelSerializer):

    class GenreSerializer(serializers.ModelSerializer):

        class Meta:
            model = Genre
            fields = ('name',)
    
    class PointSerializer(serializers.ModelSerializer):
        class Meta:
            model = Point
            fields = ('__all__')
            read_only_fields = ('movie',)

    genre_ids = GenreSerializer(many=True,read_only=True)
    points = PointSerializer(many=True, read_only=True)


    class Meta:
        model = Movie
        fields = ('title','poster_path','vote_average','release_date','overview','genre_ids','points')


class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('poster_path','id','title', 'release_date', 'genre_ids')



User = get_user_model()

class PointSerializer(serializers.ModelSerializer):


    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

    user = UserSerializer(read_only = True)

    class Meta:
        model = Point
        fields = ('__all__')
        read_only_fields = ('movie',)


class ZigiMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id','title','poster_path','release_date','overview','genre_ids')