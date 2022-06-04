from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Movie,Point

from .serializers import MovieSerializer, MovieListSerializer, PointSerializer, ZigiMovieSerializer


@api_view(['GET'])
def movie_list(request):
    # 평점이 높은 순으로 50개 출력
    movies = Movie.objects.order_by('-vote_average')[:50]
    serializer = MovieListSerializer(movies,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def movie_detail(request,movie_pk):
    movie = get_object_or_404(Movie,pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST'])
def create_point(request, movie_pk):
    user = request.user
    movie = get_object_or_404(Movie, pk=movie_pk)
    
    serializer = PointSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=user)
        points = movie.points.all()
        serializer = PointSerializer(points, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
def point_update_or_delete(request, movie_pk, point_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    point = get_object_or_404(Point, pk=point_pk)

    def update_point():
        if request.user == point.user:
            serializer = PointSerializer(instance=point, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                points = movie.points.all()
                serializer = PointSerializer(points, many=True)
                return Response(serializer.data)

    def delete_point():
        if request.user == point.user:
            point.delete()
            points = movie.points.all()
            serializer = PointSerializer(points, many=True)
            return Response(serializer.data)
    
    if request.method == 'PUT':
        return update_point()
    elif request.method == 'DELETE':
        return delete_point()


# 영화 추천 알고리즘 추가하기
@api_view(['GET'])
def zigi_movie(request):
    zigimovies = Movie.objects.all()
    serializer = ZigiMovieSerializer(zigimovies,many=True)
    return Response(serializer.data)