from django.urls import path, include
from . import views

urlpatterns = [
    path('books', views.AppView.books, name="books"),
    path('books/<int:id>', views.AppView.bookById, name="bookById"),
    path('books/add', views.AppView.booksAdd, name="booksAdd"),
    path('books/delete/<int:id>', views.AppView.booksDelete, name="booksDelete"),
    path('books/edit/<int:id>', views.AppView.booksEdit, name="booksEdit"),
    path('genres', views.AppView.genres, name="genres"),
    path('genres/<int:id>', views.AppView.booksByGenre, name="booksByGenre"),
    path('genres/<str:name>', views.AppView.booksByName, name="booksByGenre"),
    path('register', views.AppView.register, name="register"),
    path('login', views.AppView.login, name = "login"),
    path('logout', views.AppView.logout, name = "logout"),
    path('users', views.AppView.users, name="users"),
    path('account', views.AppView.account, name = "account"),
    path('users/<int:id>', views.AppView.userById, name = "userById"),
    path('users/add', views.AppView.usersAdd, name="usersAdd"),
    path('users/delete/<int:id>', views.AppView.usersDelete, name = "usersDelete"),
    path('users/edit/<int:id>', views.AppView.usersEdit, name = "usersEdit"),
    path('currentUser', views.AppView.currentUser, name = "currentUser"),
    path('order', views.AppView.order, name = "order"),
    path('cart', views.AppView.cart, name = "cart")
    
]
