import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from frases_app.models import Phrase

class Command(BaseCommand):
    help = 'Seeds the database with initial phrases from frases.txt'

    def handle(self, *args, **kwargs):
        # 1. Create a default admin user if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin')
        
        admin_user = User.objects.get(username='admin')
        
        # 2. Path to the frases.txt file (assuming it's in the root directory)
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))), 'frases.txt')

        # 3. Read the file and create Phrase objects
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                for line in f:
                    phrase_text = line.strip()
                    if phrase_text and not Phrase.objects.filter(text=phrase_text).exists():
                        Phrase.objects.create(
                            text=phrase_text,
                            author=admin_user,
                            is_approved=True
                        )
            self.stdout.write(self.style.SUCCESS('Successfully seeded the database with phrases.'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'Error: The file was not found at {file_path}. Please make sure frases.txt is in the project root.'))
