from django.shortcuts import render, HttpResponse
from django.views import View
from .models import book, appUser, genre, userToken, cart
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from uuid import uuid4

def generateToken():
    rand_token = uuid4()
    return rand_token

class AppView(View):
    def books(request):
        if request.method == "GET":
            books = book.objects.all()
            finalObject = {"books":[]}
            
            for b in books:
                finalObject["books"].append({"id":b.id ,"name": b.name, "genre": b.genre.name, "author": b.author, "oh": b.oh, "picture": b.picture, "price": b.price})

            finaljson = json.dumps(finalObject)

            return JsonResponse(finaljson, content_type = 'application/json',safe=False)
        
    def bookById(request, id):
        if request.method == "GET":
            resultBook = book.objects.get(id = id)
            finalObject = {"id":resultBook.id, "name": resultBook.name, "genre": resultBook.genre.name, "author": resultBook.author, "oh": resultBook.oh, "picture": resultBook.picture, "price": resultBook.price}
            finaljson = json.dumps(finalObject)

            return JsonResponse(finaljson, content_type = 'application/json',safe=False)
    
    @csrf_exempt
    def booksAdd(request):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)
            try:
                token = data["token"]
                userT = userToken.objects.get(token = token)
                if userT is not None:
                    try:
                        resultBook = book(name = data['name'], author = data['author'], price = data['price'], oh = data['oh'], picture = data['picture'], genre = genre.objects.get(name = data['genre']))
                        resultBook.save()
                        return JsonResponse({'message': 'ADDED'}, status=200)
                    except:
                        return JsonResponse({'error': 'An error occured'}, status=401)
            except:
                return JsonResponse({'error': 'An error occured'}, status=402)

    @csrf_exempt
    def booksDelete(request, id):
        if request.method == "DELETE":
            data = (request.body)
            data = json.loads(data)
            try:
                token = data["token"]
                userT = userToken.objects.get(token = token)
                if userT is not None:
                    try:
                        resultBook = book.objects.get(id = id)
                        resultBook.delete()
                        return JsonResponse({'message': 'DELETED'}, status=200)
                    except:
                        return JsonResponse({'error': 'An error occured'}, status=401)
            except:
                return JsonResponse({'error': 'An error occured'}, status=402)
    
    @csrf_exempt
    def booksEdit(request, id):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)
            try:
                token = data["token"]
                userT = userToken.objects.get(token = token)
                if userT is not None:
                    try:
                        resultBook = book.objects.get(id = id)
                        resultBook.name = data["name"]
                        resultBook.author = data["author"]
                        resultBook.genre = genre.objects.get(name = data['genre'])
                        resultBook.oh = data["oh"]
                        resultBook.price = data["price"]
                        resultBook.picture = data["picture"]
                        resultBook.save()
                        return JsonResponse({'message': 'UPDATED'}, status=200)
                    except Exception as e: 
                        print(e)
                        return JsonResponse({'error': 'An error occured'}, status=401)
            except:
                return JsonResponse({'error': 'An error occured'}, status=402)
                
    
    def genres(request):
        if request.method == "GET":
            genres = genre.objects.all()
            finalObject = {"genres":[]}

            for g in genres:
                finalObject["genres"].append({"id":g.id, "name":g.name})

            finaljson = json.dumps(finalObject)
            
            return JsonResponse(finaljson, content_type = 'application/json',safe=False)
    
    def booksByGenre(request, id):
        if request.method == "GET":
            g = genre.objects.get(id = id)
            b = book.objects.all().filter(genre = g)

            finalObject = {"books":[]}

            for i in b:
                finalObject["books"].append({"id": i.id, "name": i.name, "genre": i.genre.name, "author": i.author, "oh": i.oh, "picture": i.picture, "price": i.price})
            finaljson = json.dumps(finalObject)
            
            return JsonResponse(finaljson, content_type = 'application/json',safe=False)
        
    def booksByName(request, name):
        if request.method == "GET":
            b = book.objects.all().filter(name__contains = name)

            finalObject = {"books":[]}

            for i in b:
                finalObject["books"].append({"id": i.id, "name": i.name, "genre": i.genre.name, "author": i.author, "oh": i.oh, "picture": i.picture, "price": i.price})
            finaljson = json.dumps(finalObject)

            return JsonResponse(finaljson, content_type = 'application/json',safe=False)

    @csrf_exempt
    def register(request):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)

            us = data["username"]
            ps = data["password"]

            user = appUser(username = us, role = 'C')
            user.set_password(ps)
            user.save()
            return JsonResponse({'message': 'Registration successful'}, status=200)

    @csrf_exempt
    def login(request):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)

            us = data["username"]
            ps = data["password"]
            user = authenticate(request, username=us, password=ps)
            if user is not None:
                login(request, user)
                try:
                    userT = userToken.objects.get(user = user)
                    generatedToken = generateToken()
                    if userT is not None:
                        userT.token = generatedToken
                        userT.save()
                    return JsonResponse({'message': 'Login successful', "token": generatedToken}, status=200)
                except:
                    generatedToken = generateToken()
                    userT = userToken(user = user, token = generatedToken)
                    userT.save()
                    return JsonResponse({'message': 'Login successful', "token": generatedToken}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
    
    @csrf_exempt
    def logout(request):
        if request.method == "PUT":
            data = (request.body)
            data = json.loads(data)

            token = data["token"]
            resultUser = userToken.objects.get(token = token)

            if resultUser is not None:
                resultUser.token = '-'
                resultUser.save()
                return JsonResponse({'message': 'Success'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

    @csrf_exempt      
    def users(request):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)
            try:
                token = data["token"]
                userT = userToken.objects.get(token = token)
                if userT is not None:
                    users = appUser.objects.all()
                    finalObject = {"users":[]}
            
                    for u in users:
                        finalObject["users"].append({"id":u.id ,"username": u.username, "role": u.role})

                    finaljson = json.dumps(finalObject)

                    return JsonResponse(finaljson, content_type = 'application/json',safe=False)
                return JsonResponse({"error": 'Something went wrong'}, status=401)
            except:
                return JsonResponse({"error": 'Something went wrong'}, status=401)

            
    @csrf_exempt
    def account(request):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)

            us = data["username"]
            ops = data["oldpassword"]
            nps = data["newpassword"]
            token = data["token"]

            user = authenticate(request, username=us, password=ops)
            if user is not None:
                login(request, user)
                try:
                    userT = userToken.objects.get(user = user, token = token)
                    if userT is not None:
                        user.set_password(nps)
                        user.save()
                        logout(request)
                        return JsonResponse({'message': 'Password changed'}, status=200)
                except:
                    return JsonResponse({'error': 'Something went wrong. Please, try again!'}, status=402)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

    @csrf_exempt
    def userById(request, id):
        if request.method == "GET":
            resultUser = appUser.objects.get(id = id)
            finalObject = {"id":resultUser.id, "username": resultUser.username, "role": resultUser.role, "email": resultUser.email}
            finaljson = json.dumps(finalObject)

            return JsonResponse(finaljson, content_type = 'application/json',safe=False)

    @csrf_exempt
    def usersAdd(request):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)
            try:
                token = data["token"]
                userT = userToken.objects.get(token = token)
                if userT is not None:
                    try:
                        resultUser = appUser(username = data["username"], email = data["email"], role = data["role"])
                        resultUser.set_password(data["password"])
                        resultUser.save()
                        return JsonResponse({'message': 'ADDED'}, status=200)
                    except:
                        return JsonResponse({'error': 'An error occured'}, status=401)
            except:
                return JsonResponse({'error': 'An error occured'}, status=402)


    @csrf_exempt
    def usersDelete(request, id):
        if request.method == "DELETE":
            try:
                resultUser = appUser.objects.get(id = id)
                resultUser.delete()
                return JsonResponse({'message': 'DELETED'}, status=200)
            except:
                return JsonResponse({'error': 'An error occured'}, status=401)
    
    @csrf_exempt
    def usersEdit(request, id):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)
            try:
                token = data["token"]
                userT = userToken.objects.get(token = token)
                if userT is not None:
                    try:
                        resultUser = appUser.objects.get(id = id)
                        resultUser.username = data["username"]
                        if data['password'] != "":
                            resultUser.set_password(data["password"])
                        resultUser.email = data["email"]
                        resultUser.role = data["role"]
                        resultUser.save()
                        return JsonResponse({'message': 'UPDATED'}, status=200)
                    except Exception as e: 
                        print(e)
                        return JsonResponse({'error': 'An error occured'}, status=401)
            except:
                return JsonResponse({'error': 'An error occured'}, status=402)

    @csrf_exempt
    def currentUser(request):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)

            token = data["token"]
            try:
                resultUser = userToken.objects.get(token = token)
                if resultUser is not None:
                    return JsonResponse({'message': 'Success', 'userRole': resultUser.user.role}, status=200)
                else:
                    return JsonResponse({'error': 'Fail'}, status=401)
            except:
                return JsonResponse({'error': 'Invalid token'}, status=401)

    @csrf_exempt        
    def cart(request):
        if request.method == "GET":
            token = request.GET.get('token')
            if token != 'null':
                resultUser = userToken.objects.get(token = token)
                if resultUser is not None:
                    print(resultUser)
                    cartItems = cart.objects.all().filter(user = resultUser.user)
                    finalObject = {"items":[]}

                    for i in cartItems:
                        finalObject["items"].append({"id": i.book.id, "name": i.book.name, "genre": i.book.genre.name, "author": i.book.author, "oh": i.book.oh, "picture": i.book.picture, "price": i.book.price})
                    finaljson = json.dumps(finalObject)
                    return JsonResponse(finaljson, content_type = 'application/json',safe=False)
            else: 
                return JsonResponse({"error": "Fail"}, status=401)
            
        elif request.method == "POST":
            data = (request.body)
            data = json.loads(data)
            print(data)
            token = data["token"]
            itemId = data["id"]
            if token != 'null' and token != "":
                try:
                    resultUser = userToken.objects.get(token = token)
                except:
                    return JsonResponse({'error': 'Invalid token'}, status=402)
                resultUser = userToken.objects.get(token = token)
                if resultUser is not None:
                    b = book.objects.get(id = itemId)
                    if b.oh < 1:
                        return JsonResponse({'error': 'OH < 1'}, status=401)
                    try:
                        cartCheck = cart.objects.get(user = resultUser.user, book = b)
                    except:
                        cartItem = cart(user = resultUser.user, book = b)
                        cartItem.save()
                        return JsonResponse({'message': 'Success'}, status=200)
                    return JsonResponse({'message': 'Already in the cart'}, status=201)
            else:
                return JsonResponse({'error': 'Fail'}, status=402)
        
        elif request.method == "DELETE":
            data = (request.body)
            data = json.loads(data)
            print(data)
            itemId = data["id"]
            token = data["token"]
            if token != 'null' and token != "":
                try:
                    resultUser = userToken.objects.get(token = token)
                except:
                    return JsonResponse({'error': 'Invalid token'}, status=402)
                resultUser = userToken.objects.get(token = token)
                if resultUser is not None:
                    b = book.objects.get(id = itemId)
                    try:
                        cartCheck = cart.objects.get(user = resultUser.user, book = b)
                        cartCheck.delete()
                        print(cartCheck)
                    except:
                        return JsonResponse({'error': 'Failed'}, status=401)
                    return JsonResponse({'message': 'Deleted'}, status=200)
                else: 
                    return JsonResponse({'error': 'Failed'}, status=401)

    @csrf_exempt       
    def order(request):
        if request.method == "POST":
            data = (request.body)
            data = json.loads(data)
            token = data["token"]
            if token != 'null' and token != "":
                try:
                    resultUser = userToken.objects.get(token = token)
                except:
                    return JsonResponse({'error': 'Invalid token'}, status=402)
                resultUser = userToken.objects.get(token = token)
                try:
                    listOfItems = cart.objects.all().filter(user = resultUser.user)
                    if resultUser is not None:
                        for i in listOfItems:
                            try:
                                if i.book.oh < 1:
                                    return ValueError("OH < 1")
                                i.book.oh = i.book.oh - 1
                                i.book.save()
                                i.delete()
                            except:
                                return JsonResponse({'error': 'Something went wrong'}, status=403)
                        return JsonResponse({'message': 'Ordered'}, status=200)
                    return JsonResponse({'error': 'Something went wrong'}, status=404)
                except:
                    return JsonResponse({'error': 'Something went wrong'}, status=405)
            else: 
                return JsonResponse({'error': 'Failed'}, status=401)
