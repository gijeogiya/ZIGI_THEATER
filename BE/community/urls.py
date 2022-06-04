from django.urls import path
from . import views

app_name = 'community'


urlpatterns = [
    # articles
    path('article/', views.article_list_or_create),
    path('article/<int:article_pk>/', views.article_detail_or_update_or_delete),
    # comments
    path('article/<int:article_pk>/comments/', views.create_comment),
    path('article/<int:article_pk>/comments/<int:comment_pk>/', views.comment_update_or_delete),
    # reviews
    path('review/', views.review_list_or_create),
    path('review/<int:review_pk>/', views.review_detail_or_update_or_delete),
    #  # reviewcomments
    path('review/<int:review_pk>/comments/', views.create_review_comment),
    path('review/<int:review_pk>/comments/<int:reviewcomment_pk>/', views.review_comment_update_or_delete)

    

]
