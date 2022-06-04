from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    
    path('',views.movie_list),
    path('<int:movie_pk>/',views.movie_detail),
     # comments
    path('<int:movie_pk>/points/', views.create_point),
    path('<int:movie_pk>/points/<int:point_pk>/', views.point_update_or_delete),
    path('zigiresult/',views.zigi_movie)

]