from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json
from django.views.decorators.csrf import csrf_exempt
from PayTm import Checksum
import datetime
from django.views.decorators.csrf import csrf_protect
from django.core import serializers

# Create your views here.
MERCHANT_KEY= 'T5r7ShzD4laR%jsE'
def store(request):
    
    products = Product.objects.all()
    context = {'products':products}
   
    return render(request,"shopping/store.html",context)

def product(request):
    return render(request,"shopping/product.html")

@csrf_exempt
def detail(request,id):
    if request.user.is_authenticated:
        user = request.user
        customer,created = Customer.objects.get_or_create(user=user)
        products = Product.objects.filter(id=id)
        productitem = Product.objects.get(id=id)
        order,created = Order.objects.get_or_create(customer=customer,complete=False)
        #orderitems,created =OrderItem.objects.get_or_create(order=order,product=productitem)

        try:
            orderitems =OrderItem.objects.get(order=order,product=productitem)
            if request.method == "POST":
                data = json.loads(request.body)
                print(data)
                orderitems,created =OrderItem.objects.get_or_create(order=order,product=productitem)           

        except:
            pass
        
        
           
    else:
        orderitems = []
        products = Product.objects.filter(id=id)
        
        try:
            cart = json.loads(request.COOKIES['cart'])
        except:
            cart = {}
        orderitems ={'quantity':1}
        try:
            product= Product.objects.get(id=id)
            for i in cart:
                product= Product.objects.get(id=id)
                a = str(product.id)
                while(i==a):
                    print(i)
                    orderitem ={
                        'quantity':cart[i]['quantity']
                    }
                    orderitems.update(orderitem)
                    break
        except:
            pass

            
        
        
    try:
        context = {'products':products,'orderitems':orderitems}
    except:
        context = {'products':products}
    return render(request,"shopping/detail.html",context)

def cart(request):
    if request.user.is_authenticated:
      
        user = request.user
        customer,created = Customer.objects.get_or_create(user=user)
        order,created = Order.objects.get_or_create(customer=customer,complete=False)
        orderItems = order.orderitem_set.all()
        cartitems = order.totalitems
        
        
    else:
        try:
            cart =json.loads(request.COOKIES['cart'])
            
        except:
            cart ={}
        orderItems=[]
        order={'finaltotal':0}
        
        cartitems = 0  
        for i in cart:
            try:
                productId = i
                
                product = Product.objects.get(id=productId)
                
                cartitems += cart[i]['quantity']
                subtotal = product.price * cart[i]['quantity']
                order['finaltotal'] +=subtotal
                orderItem = {
                    'product':{
                        'id':product.id,
                        'name':product.name,
                        'price':product.price,
                        'imageURL':product.imageURL,
                    },
                    'quantity':cart[i]['quantity'],
                    'subtotal':subtotal,
                    'size': cart[i]['size']
                }
                orderItems.append(orderItem)
            
            except:
                pass
            
                

        
              
    context={'order':order,'orderItems':orderItems,'cartitems':cartitems}
    return render(request,"shopping/cart.html",context)


    

def shipping(request):
    transaction_id = datetime.datetime.now().timestamp()
    try:
        if request.user.is_authenticated:
            
            user = request.user
            customer,created = Customer.objects.get_or_create(user=user)
            order = Order.objects.get(customer=customer,complete=False)
            orderItems = order.orderitem_set.all()
            list={}
            
            if request.method=="POST":
                
                data = json.loads(request.body)
                fname = data['fname']
                amount = data['amount']
                country = data['country']
                city = data['city']
                state = data['state']
                address = data['address']
                zipcode = data['zipcode']
                shippingaddress,created = ShippingAddress.objects.get_or_create(order=order,name=fname,amount=amount,country=country,city=city,state=state,address=address,zipcode=zipcode)
                order.transaction_id = transaction_id
                order.save()
                id = shippingaddress.order
                orderid = str(id)
                c_id = customer.id
                customerid = str(c_id)

                
                list = {'fname':fname,'amount':amount,'country':country,'city':city,'state':state,'address':address,'zipcode':zipcode,'orderid':orderid,'customerid':customerid}
                
                
                return JsonResponse(list)
            

        else:
            
            order ={'finaltotal':0}
            orderItems = []
            cart =json.loads(request.COOKIES['cart'])
            if request.method == "POST":
                
                data = json.loads(request.body)
                
                uname = data['uname']
                surname = data['surname']
                phonenumber = data['phonenumber']
                email = data['email']
                customer,created = Customer.objects.get_or_create(email=email)
                customer.name = uname
                customer.surname = surname
                customer.phonenumber = phonenumber
                customer.save()
                orderset,created = Order.objects.get_or_create(customer=customer,complete=False)
                orderset.transaction_id = transaction_id
                orderset.save()
                
                fname = data['fname']
                country = data['country']
                city = data['city']
                state = data['state']
                address = data['address']
                zipcode = data['zipcode']
                amount = data['amount']
                shippingaddress,created = ShippingAddress.objects.get_or_create(order=orderset,name=fname,city=city,state=state,country=country,address=address,amount=amount,zipcode=zipcode)

                orderid = str(shippingaddress.order)
                customerid = str(customer.id)
                data_dict = {'customerid':customerid,'amount':amount,'orderid':orderid}
                for i in cart:

                    id = i
                    pd = Product.objects.get(id=id)
                    size = cart[i]['size']
                    quantity= cart[i]['quantity']
                    orderitemset = OrderItem.objects.create(order=orderset,quantity=quantity,size=size,product=pd)
                return JsonResponse(data_dict)
            try:
                cart =json.loads(request.COOKIES['cart'])
                
                for i in cart:
                    productId = i
                    product = Product.objects.get(id=productId)
                    
                    subtotal= product.price * cart[i]['quantity']
                    size = cart[i]['size']
                    quantity = cart[i]['quantity']
                    orderItem = {
                        'product':{
                            'id':product.id,
                            'name':product.name,
                            'price':product.price,
                            'imageURL':product.imageURL,
                        },
                        'quantity':cart[i]['quantity'],
                        'size': cart[i]['size'],
                        'subtotal': subtotal,
                    }
                    order['finaltotal'] +=subtotal
                    orderItems.append(orderItem)
                    

                    
            except:
                pass
            

        context={'order':order,'orderItems':orderItems}
        return render(request,"shopping/shipping.html",context)
    except:
        return render(request,"shopping/shipping.html")

def paytm(request):
    if request.user.is_authenticated:
        if request.method =="POST":
            print("data is coming")
            customerid = request.POST.get('tcustid')
            amount = request.POST.get('tamount')
            orderid = request.POST.get('torderid')
            


        
        param_dict ={
            'MID': "yzQAaq20357083025949",
            'ORDER_ID':str(orderid) ,
            'TXN_AMOUNT': str(amount),
            'CUST_ID': str(customerid),
            'INDUSTRY_TYPE_ID': 'Retail',
            'WEBSITE': 'WEBSTAGING',
            'CHANNEL_ID': 'WEB',
            'CALLBACK_URL':'http://127.0.0.1:8000/handlerequest/',

            }
        param_dict['CHECKSUMHASH'] = Checksum.generate_checksum(param_dict,MERCHANT_KEY)
        

    else:
        if request.method =="POST":
            print("data is coming")
            customerid = request.POST.get('tcustid')
            amount = request.POST.get('tamount')
            orderid = request.POST.get('torderid')
            


        
        param_dict ={
            'MID': "yzQAaq20357083025949",
            'ORDER_ID':str(orderid) ,
            'TXN_AMOUNT': str(amount),
            'CUST_ID': str(customerid),
            'INDUSTRY_TYPE_ID': 'Retail',
            'WEBSITE': 'WEBSTAGING',
            'CHANNEL_ID': 'WEB',
            'CALLBACK_URL':'http://127.0.0.1:8000/handlerequest/',

            }
        param_dict['CHECKSUMHASH'] = Checksum.generate_checksum(param_dict,MERCHANT_KEY)

    context ={'param_dict':param_dict}
    return render(request,"shopping/payment.html",context)

'''
def cart(request):
    if request.user.is_authenticated:
      
        user = request.user
        customer,created = Customer.objects.get_or_create(user=user)
        order,created = Order.objects.get_or_create(customer=customer,complete=False)
        orderItems = order.orderitem_set.all()
        cartitems = order.totalitems
        
        
    else:
        try:
            cart =json.loads(request.COOKIES['cart'])
            
        except:
            cart ={}
        orderItems=[]
        order={'finaltotal':0}
        
        cartitems = 0  
        for i in cart:
            try:
                productId = i
                
                product = Product.objects.get(id=productId)
                
                cartitems += cart[i]['quantity']
                subtotal = product.price * cart[i]['quantity']
                order['finaltotal'] +=subtotal
                orderItem = {
                    'product':{
                        'id':product.id,
                        'name':product.name,
                        'price':product.price,
                        'imageURL':product.imageURL,
                    },
                    'quantity':cart[i]['quantity'],
                    'subtotal':subtotal
                }
                orderItems.append(orderItem)
            
            except:
                pass
            
                

        
              
    context={'order':order,'orderItems':orderItems,'cartitems':cartitems}
    return render(request,"shopping/cart.html",context)
'''
@csrf_exempt
def newview(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        productId = int(data['productId'])
        size = data['size']
        action = data ['action']
        quantity = int(data['quantity'])
        print("hello this is quantity",quantity)
        user = request.user
        
        customer,created = Customer.objects.get_or_create(user = user)
        order,created = Order.objects.get_or_create(customer=customer,complete=False)
        product = Product.objects.get(id=productId)
        orderItem,created = OrderItem.objects.get_or_create(order=order,product=product)
        print("this is size",size)
        
            
        orderItem.size =size
        orderItem.quantity = quantity
        orderItem.save()
        
        
        
        
        print(orderItem.quantity)
    else:
        print("hello i am new view")
    item = {'quantity':orderItem.quantity}
    return JsonResponse(item)

@csrf_exempt
def updateCart(request):
    data = json.loads(request.body)
    
    if request.user.is_authenticated:
        action = data['action']
        productId = data['productId']
        user = request.user
        
        customer = Customer.objects.get(user=user)
        
        order,created = Order.objects.get_or_create(customer=customer,complete=False)
        orderItem,created = OrderItem.objects.get_or_create(order=order,product__id=productId)
        print(orderItem)

        if action == "add":
            orderItem.quantity +=1
        elif action == "remove" and orderItem.quantity >1:
            orderItem.quantity -=1
        orderItem.save()
        if action == "delete":
            orderItem.delete()
        print("this is size",orderItem.size)
        
        data['orderItem'] = orderItem.quantity
        data['total'] = order.finaltotal
        data['subtotal'] = orderItem.subtotal
        data['totalitems'] = order.totalitems
    else:
        print(data)
    
    return JsonResponse(data)


@csrf_exempt
def handlerequest(request):
    try:
        form = request.POST
        response_dict = {}
        for i in form.keys():
            response_dict[i] = form[i]
            if i=='CHECKSUMHASH':
                checksum = form[i]
        verify = Checksum.verify_checksum(response_dict,MERCHANT_KEY,checksum)
        if verify:
            if response_dict['RESPCODE'] =='01':
                print("order sucess")
                order = Order.objects.get(complete=False,id=response_dict['ORDERID'])
                order.complete=True
                order.save()
            else:
                print("order fail")
    
    except:
        pass
    
    
    return render(request,"shopping/checking.html",{'response':response_dict})


def Tshirt(request):
    product = Product.objects.filter(category = "Tshirt-category")
    context = {'products':product}
    return render(request,"shopping/tshirt.html",context)

def Shirt(request):
    product = Product.objects.filter(category = "shirt-category")
    context = {'products':product}
    return render(request,"shopping/tshirt.html",context)