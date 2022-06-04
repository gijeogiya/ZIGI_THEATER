from rest_framework import serializers
from django.contrib.auth import get_user_model
from community.models import Article,Review


class ProfileSerializer(serializers.ModelSerializer):

    # 리뷰도 추가하기

    class ArticleSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Article
            fields = ('pk', 'title', 'content')

    class ReviewSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Review
            fields = ('pk', 'title','movie_title','score','content')

  
    articles = ArticleSerializer(many=True)
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = get_user_model()
        fields = ('pk', 'username', 'email', 'articles','reviews')

