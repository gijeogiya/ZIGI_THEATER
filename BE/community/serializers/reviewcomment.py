from rest_framework import serializers
from django.contrib.auth import get_user_model

from ..models import ReviewComment

User = get_user_model()

class ReviewCommentSerializer(serializers.ModelSerializer):


    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

    user = UserSerializer(read_only = True)

    class Meta:
        model = ReviewComment
        fields = ('pk','user','content','review')
        read_only_fields = ('review',)



