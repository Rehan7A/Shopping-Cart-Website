from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Customer(models.Model):
    user = models.OneToOneField(User,null=True,blank=True,on_delete=models.CASCADE)
    name = models.CharField(max_length=25,null=True,blank=True)
    surname = models.CharField(max_length=25,null=True,blank=True)
    email = models.CharField(max_length=25,null=True,blank=True)
    phonenumber = models.IntegerField(null=True,blank=True)

    

class Product(models.Model):
    name = models.CharField(max_length=25)
    price = models.IntegerField()
    title = models.CharField(max_length=200)
    options = (
        ('shirt-category','shirts'),
        ('Tshirt-category','T-shirts'),
        ('pant-category','Pants'),
        ('Hoodie-category','Hoodies'),
        ('Shoes-category','Shoes'),

    )
    category = models.CharField(null=True,blank=False,choices=options,max_length=40)
    
    image = models.ImageField(blank=True,null=True)

    def __str__(self):
        return self.name +"  "+ self.category

    def imageURL(self):
        try:
            image = self.image.url
            return image
        except:
            image = ''
            return image

class Order(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,null=True,blank=True)   
    complete = models.BooleanField(default=False,blank=False,null=True)
    transaction_id = models.CharField(max_length=50,null=True,blank=True)
    date_created = models.DateTimeField(auto_now_add=True,null=True,blank=True)

    def __str__(self):
        return str(self.id)
    
    
    @property
    def totalitems(self):
        
        items = self.orderitem_set.all()
        total = sum([item.quantity for item in items])
        return total
        
            
    @property
    def finaltotal(self):
        items = self.orderitem_set.all()
        total = sum([item.subtotal for item in items])
        return total
        


class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,null=True,blank=True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE,null=True,blank=True)
    quantity = models.IntegerField(default=1)
    size = models.CharField(max_length=10,blank=True)
    date_created = models.DateTimeField(auto_now_add=True,null=True,blank=False)

    def __str__(self):
        return str(self.id)
    @property
    def subtotal(self):
        try:
            total = self.quantity * self.product.price
        except:
            total =0
        return total
        
        
   
   
class ShippingAddress(models.Model):
    order = models.ForeignKey(Order,null=True,blank=False,on_delete=models.CASCADE)
    amount = models.CharField(null=False,max_length=100)
    name = models.CharField(max_length=40)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=40)
    address = models.CharField(max_length=200)
    zipcode = models.CharField(max_length=50)
    




    