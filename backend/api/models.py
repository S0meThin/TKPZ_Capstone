from django.db import models
from django.contrib.auth.models import AbstractUser

class appUser(AbstractUser):
    ROLE_CHOICES = (
        ('C', 'Customer'),
        ('A', 'Admin'),
    )

    email = models.CharField(max_length=40)
    role = models.CharField(max_length=1, choices=ROLE_CHOICES)

class userToken(models.Model):
    user = models.ForeignKey(appUser, on_delete = models.CASCADE)
    token = models.CharField(max_length=100)

class genre(models.Model):
    name = models.CharField(max_length=30)

class book(models.Model):
    name = models.CharField(max_length=40)
    author = models.CharField(max_length=40)
    price = models.FloatField(default=0.0)
    genre = models.ForeignKey(genre, on_delete = models.CASCADE)
    oh = models.IntegerField()
    picture = models.CharField(max_length=250)

class cart(models.Model):
    user = models.ForeignKey(appUser, on_delete=models.CASCADE)
    book = models.ForeignKey(book, on_delete=models.CASCADE)
