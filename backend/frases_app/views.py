from rest_framework import generics, permissions
from .models import Phrase
from .serializers import PhraseSerializer

class PhraseList(generics.ListCreateAPIView):
    queryset = Phrase.objects.filter(is_approved=True)
    serializer_class = PhraseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PendingPhraseList(generics.ListAPIView):
    queryset = Phrase.objects.filter(is_approved=False).order_by('created_at')
    serializer_class = PhraseSerializer
    permission_classes = [permissions.IsAdminUser]

class PhraseApprove(generics.UpdateAPIView):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_update(self, serializer):
        serializer.save(is_approved=True)

class PhraseVote(generics.UpdateAPIView):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        # 'action' will be 'upvote' or 'downvote' from the request
        action = self.request.data.get('action')
        instance = serializer.instance
        if action == 'upvote':
            instance.upvotes += 1
        elif action == 'downvote':
            instance.downvotes += 1
        instance.save()
