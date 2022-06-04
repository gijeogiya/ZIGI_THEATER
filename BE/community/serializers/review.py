from rest_framework import serializers
from django.contrib.auth import get_user_model

from ..models import Review
from .reviewcomment import ReviewCommentSerializer

User = get_user_model()

class ReviewSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

    user = UserSerializer(read_only = True)
    reviewcomments = ReviewCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = ('pk','user','title','content','reviewcomments','movie_title','score')



class ReviewListSerializer(serializers.ModelSerializer):

     class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

     user = UserSerializer(read_only=True)
    
     reviewcomment_count = serializers.IntegerField()

     class Meta:
         model = Review
         fields = ('pk', 'user', 'title', 'reviewcomment_count','movie_title','score')

