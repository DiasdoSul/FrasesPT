from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class Command(BaseCommand):
    help = 'Test authentication setup and create test user if needed'

    def handle(self, *args, **kwargs):
        # Check if admin user exists
        if not User.objects.filter(username='admin').exists():
            self.stdout.write('Creating admin user...')
            admin_user = User.objects.create_superuser('admin', 'admin@example.com', 'admin')
            self.stdout.write(self.style.SUCCESS(f'Admin user created: {admin_user.username}'))
        else:
            admin_user = User.objects.get(username='admin')
            self.stdout.write(f'Admin user exists: {admin_user.username}')
        
        # Check if token exists for admin user
        token, created = Token.objects.get_or_create(user=admin_user)
        if created:
            self.stdout.write(self.style.SUCCESS(f'Token created for admin user: {token.key}'))
        else:
            self.stdout.write(f'Token exists for admin user: {token.key}')
        
        # Test authentication
        from django.contrib.auth import authenticate
        user = authenticate(username='admin', password='admin')
        if user:
            self.stdout.write(self.style.SUCCESS('Authentication test passed'))
        else:
            self.stdout.write(self.style.ERROR('Authentication test failed'))
        
        self.stdout.write(self.style.SUCCESS('Auth setup test completed'))
