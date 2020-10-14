from django.urls import path
from .import views

urlpatterns = [
    path('',views.store,name="home"),
    path('product/',views.product,name="product"),
    path('detail/<int:id>',views.detail,name="detail"),
    path('shipping/',views.shipping,name="shipping"),
    path('cart/',views.cart,name="cart"),
    path('handlerequest/',views.handlerequest,name='handlerequest'),
    path('paytm/',views.paytm,name='paytm'),
    path("newview/",views.newview,name='newview'),
    path('updatecart/',views.updateCart),
    path("tshirt/",views.Tshirt,name="tshirt"),
    path("shirt/",views.Shirt,name="shirt"),



    
]