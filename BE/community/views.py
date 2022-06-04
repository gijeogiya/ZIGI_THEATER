from django.shortcuts import get_object_or_404
from django.db.models import Count

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Article, Comment,Review,ReviewComment
from .serializers.article import ArticleListSerializer, ArticleSerializer
from .serializers.comment import CommentSerializer
from .serializers.review import ReviewSerializer,ReviewListSerializer
from .serializers.reviewcomment import ReviewCommentSerializer



@api_view(['GET', 'POST'])
def article_list_or_create(request):

    def article_list():
        # comment 개수 추가
        articles = Article.objects.annotate(
            comment_count=Count('comments', distinct=True),
        ).order_by('-pk')
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    
    def create_article():
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        return article_list()
    elif request.method == 'POST':
        return create_article()


@api_view(['GET', 'PUT', 'DELETE'])
def article_detail_or_update_or_delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)

    def article_detail():
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    def update_article():
        if request.user == article.user:
            serializer = ArticleSerializer(instance=article, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)

    def delete_article():
        if request.user == article.user:
            article.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == 'GET':
        return article_detail()
    elif request.method == 'PUT':
        if request.user == article.user:
            return update_article()
    elif request.method == 'DELETE':
        if request.user == article.user:
            return delete_article()

@api_view(['POST'])
def create_comment(request, article_pk):
    user = request.user
    article = get_object_or_404(Article, pk=article_pk)
    
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article, user=user)
        comments = article.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
def comment_update_or_delete(request, article_pk, comment_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)

    def update_comment():
        if request.user == comment.user:
            serializer = CommentSerializer(instance=comment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                comments = article.comments.all()
                serializer = CommentSerializer(comments, many=True)
                return Response(serializer.data)

    def delete_comment():
        if request.user == comment.user:
            comment.delete()
            comments = article.comments.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
    
    if request.method == 'PUT':
        return update_comment()
    elif request.method == 'DELETE':
        return delete_comment()



# Review 게시판
@api_view(['GET', 'POST'])
def review_list_or_create(request):

    def review_list():
        # comment 개수 추가
        reviews = Review.objects.annotate(
            reviewcomment_count=Count('reviewcomments', distinct=True),
        ).order_by('-pk')
        serializer = ReviewListSerializer(reviews, many=True)
        return Response(serializer.data)
    
    def create_review():
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        return review_list()
    elif request.method == 'POST':
        return create_review()


@api_view(['GET', 'PUT', 'DELETE'])
def review_detail_or_update_or_delete(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)

    def review_detail():
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def update_review():
        if request.user == review.user:
            serializer = ReviewSerializer(instance=review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)

    def delete_review():
        if request.user == review.user:
            review.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == 'GET':
        return review_detail()
    elif request.method == 'PUT':
        if request.user == review.user:
            return update_review()
    elif request.method == 'DELETE':
        if request.user == review.user:
            return delete_review()


# 리뷰 댓글
@api_view(['POST'])
def create_review_comment(request, review_pk):
    user = request.user
    review = get_object_or_404(Review, pk=review_pk)
    
    serializer = ReviewCommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(review=review, user=user)
        reviewcomments = review.reviewcomments.all()
        serializer = CommentSerializer(reviewcomments, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
def review_comment_update_or_delete(request, review_pk, reviewcomment_pk):
    review = get_object_or_404(Review, pk=review_pk)
    reviewcomment = get_object_or_404(ReviewComment, pk=reviewcomment_pk)

    def update_review_comment():
        if request.user == reviewcomment.user:
            serializer = CommentSerializer(instance=reviewcomment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                reviewcomments = review.reviewcomments.all()
                serializer = ReviewCommentSerializer(reviewcomments, many=True)
                return Response(serializer.data)

    def delete_review_comment():
        if request.user == reviewcomment.user:
            reviewcomment.delete()
            reviewcomments = review.reviewcomments.all()
            serializer = ReviewCommentSerializer(reviewcomments, many=True)
            return Response(serializer.data)
    
    if request.method == 'PUT':
        return update_review_comment()
    elif request.method == 'DELETE':
        return delete_review_comment()