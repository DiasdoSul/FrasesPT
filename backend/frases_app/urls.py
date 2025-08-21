from django.urls import path
from . import views

urlpatterns = [
    path('phrases/', views.PhraseList.as_view(), name='phrase-list'),
    path('phrases/pending/', views.PendingPhraseList.as_view(), name='pending-phrase-list'),
    path('phrases/<int:pk>/approve/', views.PhraseApprove.as_view(), name='phrase-approve'),
    path('phrases/<int:pk>/vote/', views.PhraseVote.as_view(), name='phrase-vote'),
    path('auth/csrf/', views.csrf, name='csrf'),
    path('auth/user/', views.user_info, name='user_info'),

]
