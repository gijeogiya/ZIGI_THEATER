from django.contrib import admin
from .models import Article,Comment, Review,ReviewComment


admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Review)
admin.site.register(ReviewComment)