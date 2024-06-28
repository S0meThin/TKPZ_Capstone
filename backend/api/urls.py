from django.urls import path, include
from . import views

urlpatterns = [
    path('books', views.AppView.books, name="books"),
    path('books/<int:id>', views.AppView.bookById, name="bookById"),
    path('books/delete/<int:id>', views.AppView.booksDelete, name="booksDelete"),
    path('genres', views.AppView.genres, name="genres"),
    path('genres/<int:id>', views.AppView.booksByGenre, name="booksByGenre"),
    path('genres/<str:name>', views.AppView.booksByName, name="booksByGenre"),
    path('register', views.AppView.register, name="register"),
    path('login', views.AppView.login, name = "login"),
    path('logout', views.AppView.logout, name = "logout"),
    path('account', views.AppView.account, name = "account"),
    path('currentUser', views.AppView.currentUser, name = "currentUser"),
    path('order', views.AppView.order, name = "order"),
    path('cart', views.AppView.cart, name = "cart")
    
]
