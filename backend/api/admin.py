from django.contrib import admin
from .models import appUser, genre, book, userToken, cart
# Register your models here.
admin.site.register(appUser)
admin.site.register(genre)
admin.site.register(book)
admin.site.register(userToken)
admin.site.register(cart)