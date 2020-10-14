//=====------------------------detail- page----------------

var parent = document.getElementById("change")
var magic = document.getElementsByClassName("magic")


for(var i=0;i<magic.length;i++){
    magic[i].addEventListener("click",function(e){
        var parent = document.getElementById("change")
       
        parent.src = e.target.src
        
    })
}



/*-------------cart-page----------------*/


var btn = document.getElementsByClassName("button-action")

for(var i =0;i<btn.length;i++){
    btn[i].addEventListener('click',function(e){
        let action = this.dataset.action
        let productId = this.dataset.product
        
        if(user=='AnonymousUser'){
            console.log("user is not logged in")
            
            call(action,productId)
        }
        else{
            console.log(user)
            updatecart(action,productId)
        }  
    })
}

//////////////////////////////////////////CART PAGE LOGGED IN ////////////////////////////

function updatecart(action,productId){
    
    console.log(action)
    console.log(productId)

    var xhr = new XMLHttpRequest();
    xhr.open("POST",'/updatecart/',true)

    var data = {'action':action,'productId':productId}

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            console.log("data is fetched")
            if(xhr.status == 200){
               var data = JSON.parse(this.responseText)

               var two = document.getElementsByClassName('two')
               for(var i =0; i<two.length;i++){
                   var b = two[i].getAttribute('data-product')
                   if(data['productId']==b){
                        two[i].innerHTML = data['orderItem']
                   }
                   
                }


                var orderitemquantity = document.getElementsByClassName('orderItem')
                for(var i =0; i<orderitemquantity.length;i++){
                    var a = orderitemquantity[i].getAttribute('data-product')
                    if(data['productId']==a){
                        
                        orderitemquantity[i].innerHTML = data['orderItem']
                    }
           
                }


                var four = document.getElementsByClassName('four')
         
                for(var i =0; i<two.length;i++){
                    var b = two[i].getAttribute('data-product')
                    if(data['productId']==b){
                    
                    four[i].innerHTML = data['subtotal']
                    
                    }
                }

                var totalitems = document.getElementById('cartitems')
                totalitems.innerHTML = data['totalitems']


                var total = document.getElementsByClassName('total')
                for(var i =0; i<total.length;i++){
                    total[i].innerHTML = `$${data['total']}`
                }
                var box = document.getElementsByClassName('main-item')
                for(var i=0;i<box.length;i++){
                    var c =box[i].getAttribute('data-product')
                    if(data['productId']==c){
                        console.log(c)
                        if(data['action'] == 'delete'){
                            console.log('triggerd')
                            box[i].style.display = "none"
                            
                        }
                    }
                }

               console.log(data)
            }
        }
    }

    xhr.send(JSON.stringify(data))



}





//================================= guest cart action-------------------------------
function callme(){
        var total = document.getElementsByClassName("four")
        console.log(total)
        totalArray = []

        for(var i=0;i<total.length;i++){
            totalValue = parseInt(total[i].innerHTML)
            console.log(totalValue)
            totalArray.push(totalValue)
        }

        console.log(totalArray)
        let value = 0
        for(var i=0;i<totalArray.length;i++){
        value += totalArray[i];
        }
        console.log(value)

        var element = document.getElementsByClassName("total")
        for(var i=0;i<element.length;i++){
            element[i].innerHTML = "$"+ value
            console.log(element[i].innerHTML)
        }

    }
    
function totalItems(){
    var item = document.getElementsByClassName("two")
        var array =[]
        console.log(item)

            for(var i=0;i<item.length;i++){
                var items = parseInt(item[i].innerHTML)
                console.log(items)
                array.push(items)
                
            }
            console.log(array)
            
            var cartitems = document.getElementById("cartitems")
            cartitems.innerHTML = array.reduce(myfunc)

            function myfunc(total,num){
                return total + num
            }
            console.log(cartitems.innerHTML)
}


function call(action,productId){
    
    var item = document.getElementsByClassName("two")
    var subtotal = document.getElementsByClassName("four")
    
    
    if(action == "add"){
        cart[productId]['quantity'] +=1
        for(var i=0;i<item.length;i++){
            var a = item[i].getAttribute("data-product")
            if(productId == a){
                item[i].innerHTML = cart[productId]['quantity']
            }
            
        }
        var quantity = document.getElementsByClassName("orderItem")
        for(var i=0;i<quantity.length;i++){
            var b = quantity[i].getAttribute("data-product")
            if(productId == b){
                quantity[i].innerHTML = cart[productId]['quantity']
            }
            
        }
        
        for(var i = 0 ; i < subtotal.length ; i++){
            var c = subtotal[i].getAttribute("data-product")
            console.log(c)
            if(productId==c){

                console.log(subtotal[i].innerHTML)
                var price = document.getElementsByClassName("price")
                for(var i=0;i<price.length;i++){
                    var product = price[i].getAttribute("data-product")
                    
                    if(product == productId){
                        var priceValue = price[i].innerHTML
                        var array  = priceValue.split("$")
                        var double = parseInt(array[1])
                        console.log(double)
                        subtotal[i].innerHTML = cart[productId]['quantity'] * double

                    }
                    
                }

                
            }
            
            
        }


        

        totalItems()
        callme()
        
    }
    else if (action=="remove" & cart[productId]['quantity'] >1){
        cart[productId]['quantity'] -=1
        for(var i=0;i<item.length;i++){
            var a = item[i].getAttribute("data-product")
            if(productId == a){
                item[i].innerHTML = cart[productId]['quantity']
            }
            
        }
        var quantity = document.getElementsByClassName("orderItem")
        for(var i=0;i<quantity.length;i++){
            var b = quantity[i].getAttribute("data-product")
            if(productId == b){
                quantity[i].innerHTML = cart[productId]['quantity']
            }
            
        }


        for(var i = 0 ; i < subtotal.length ; i++){
            var c = subtotal[i].getAttribute("data-product")
            console.log(c)
            if(productId==c){

                console.log(subtotal[i].innerHTML)
                var price = document.getElementsByClassName("price")
                for(var i=0;i<price.length;i++){
                    var product = price[i].getAttribute("data-product")
                    
                    if(product == productId){
                        var priceValue = price[i].innerHTML
                        var array  = priceValue.split("$")
                        var double = parseInt(array[1])
                        console.log(double)
                        subtotal[i].innerHTML = cart[productId]['quantity'] * double

                    }
                    
                }

                
            }
            
            
        }

        
        totalItems()
        callme()

    }

    else if(action == "delete"){
        console.log("item deletd")
        console.log(productId)
        
        delete cart[productId]
        
        
        
        
       for(var i=0;i<item.length;i++){
            var a = item[i].getAttribute("data-product")
            if(productId == a){
            
                item[i].innerHTML = 0
                var quantity = document.getElementsByClassName("orderItem")
                for(var i=0;i<quantity.length;i++){
                    var b = quantity[i].getAttribute("data-product")
                    if(productId == b){
                        quantity[i].innerHTML = 0
                    }
                    
                }
                for(var i = 0 ; i < subtotal.length ; i++){
                    var c = subtotal[i].getAttribute("data-product")
                    console.log(c)
                    if(productId==c){
        
                        console.log(subtotal[i].innerHTML)
                        var price = document.getElementsByClassName("price")
                        for(var i=0;i<price.length;i++){
                            var product = price[i].getAttribute("data-product")
                            
                            if(product == productId){
                                var priceValue = price[i].innerHTML
                                var array  = priceValue.split("$")
                                var double = parseInt(array[1])
                                console.log(double)
                                subtotal[i].innerHTML = 0
        
                            }
                            
                        }
        
                        
                    }
                    
                    
                }
        
        
                
        
                totalItems()
                callme()

                var mainItem = document.getElementsByClassName("main-item")
                for(var i=0;i<mainItem.length;i++){
                    var product = mainItem[i].getAttribute("data-product")
                    if(productId ==product){
                        mainItem[i].innerHTML =""
                    }
                }


        }

    }

}

    console.log(cart)
    document.cookie = "cart=" + JSON.stringify(cart) + ";path=/;"

}

////////////////////////////////////DETAIL-PAGE////////////////////////////////////////////

let sizebutton = document.getElementsByClassName("sizebutton")

    for(var i=0;i<sizebutton.length;i++){
        sizebutton[i].addEventListener('click',function(e){
            let size = e.target.value
                let productId = this.dataset.product
                
                if(user=='AnonymousUser'){
                    console.log("user is not logged in")                 
                    addCookie(size,productId) 
                }
                else{
                    console.log("user is logged in")
                    sendSize(size,productId)  
                }

        })


    }

///////////////////////////////////////DETAIL LOGGED IN USER////////////////

function sendSize(size,productId){
    size = size
    productId = productId
    var button = document.getElementById("button-1")
    button.value = size
    button.setAttribute("productid",productId)
    console.log(button)
}





//----------------------------authenticated user detail page---------------------

let quantity = document.getElementsByClassName("quantity-btn")



for(var i=0;i<quantity.length;i++){
    quantity[i].addEventListener('click',function(){
         let action = this.dataset.action
         let productId = this.dataset.product
            
        if(user=='AnonymousUser'){
            console.log(user)
           addQuantity(action,productId)
        }
        else{
            
            authQuantity(action,productId)   
            
        }   
       // window.location.reload()
    })
}


function authQuantity(action,productId){
    console.log(action)
    console.log(productId)

    var button = document.getElementById("button-1")
    button.setAttribute("action",action)
    button.setAttribute("productid",productId)
    console.log(button)

    var quantityadded = document.getElementById('quantityadded')
    if(action == 'add'){
        
       
       var num1 = parseInt(quantityadded.innerHTML)
       var num2 = num1+1
       quantityadded.innerHTML = num2
    }
    if(action == 'remove'){
         num1 = parseInt(quantityadded.innerHTML)
         num2 = num1-1
         quantityadded.innerHTML = num2
         if(num2 <=0){
             num2 =1
             quantityadded.innerHTML = num2
         }
     }
     button.setAttribute("quantity",num2)


}

try{
var button = document.getElementById("button-1")
button.addEventListener("click",function(){
    console.log("i am button function")
    buttonValue = button.value
    if(user == "AnonymousUser"){

    
        if(buttonValue =="" ){
            console.log('value is empty')
            var extra = document.getElementById("extra")
            console.log(extra)
            extra.style.color = "red"
            extra.innerHTML = "please select the size !!"
            
        }
        else{
            var productId = document.getElementById("button-1").getAttribute("productid")
            var size = buttonValue
            var num2 = document.getElementById("button-1").getAttribute("quantity")
            quantity = parseInt(num2)
            if(cart[productId]==undefined){
                cart[productId]={'size':size,"quantity":quantity}
                console.log(" i am at 1")
            }


            else if(cart[productId]['quantity'] == null){
                delete cart[productId]
                console.log("i am at 2")
            }

            if(quantity <= 0){
                delete cart[productId]
            }

            else{
                cart[productId] = {'size':size,'quantity':quantity}
                console.log(" i am at 4")

            }

            
            
            document.cookie = "cart="+ JSON.stringify(cart) +"; path=/;";
            console.log("Cart :",cart)

            setTimeout(function(){
                alert("Item Successfully Added")
                window.location.reload()
            },100)
            
            
    
        
        }
    }
    else{
        console.log("i am logged in user")

        var size = this.getAttribute("value")
        var productId = this.getAttribute("productid")
        var action = this.getAttribute("action")
       var quantity = this.getAttribute("quantity")
       console.log(quantity)
        console.log(size)
        if(size !="" & quantity !=""){

            var xhr = new XMLHttpRequest();

            xhr.open("POST",'/newview/',true)

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    console.log("reday to recive data")
                    if(xhr.status==200){
                    var data =JSON.parse(xhr.responseText) 
                    console.log(data)
                    var quantityadded = document.getElementById('quantityadded')
                        quantityadded.innerHTML = data['quantity']

                    }
                }
            }

            data = {'size':size,'action':action,'productId':productId,'quantity':quantity}

            var extra = document.getElementById("extra")
            console.log(extra)
            extra.style.color = "red"
            extra.innerHTML = ""

            xhr.send(JSON.stringify(data))

            setTimeout(function(){
                alert("Item Successfully Added")
                window.location.reload()
            },100)
            

            
           
            
            
        }

        else if(size ==""){
            var extra = document.getElementById("extra")
            console.log(extra)
            extra.style.color = "red"
            extra.innerHTML = "please select the size !!"
        }

    }
    
})
}
catch{
    console.log("i am executed")
    
}

// -----------------------------guest detail page---------------------------------------

function addCookie(size,productId){
    var size = size
    var productId = productId
       console.log('Size :',size)
       console.log('ProductId :',productId)

       var addValue = document.getElementById("button-1")
       addValue.setAttribute("productid",productId)
       addValue.value = size
       console.log(addValue)
       
}



function addQuantity(action,product){
    var action = action
    var productId = product
    console.log(action)
    
    
    var quantityadded = document.getElementById('quantityadded')
    if(action == 'add'){
        
       
       var num1 = parseInt(quantityadded.innerHTML)
       var num2 = num1+1
       quantityadded.innerHTML = num2
    }
    if(action == 'remove'){
         num1 = parseInt(quantityadded.innerHTML)
         num2 = num1-1
         quantityadded.innerHTML = num2
         if(num2 <=0){
             num2 =1
             quantityadded.innerHTML = num2
         }
     }

     var buttoncheck = document.getElementById("button-1")
     buttoncheck.setAttribute("quantity",num2)
     
     var a = buttoncheck.getAttribute("quantity")
     console.log(buttoncheck)
 
}
   


// ---------------------------shipping- page-----------------
var userform = document.getElementsByClassName("user-text")


var shippinglabel = document.getElementById("shippinglabel")
var orderlabel = document.getElementById("orderlabel")
var paymentlabel = document.getElementById("paymentlabel")

try{
    if (user=="AnonymousUser"){
        console.log("user is not logged in")
    }
    else{
        userform[0].style.display="none"
        shippinglabel.innerHTML=" Step 1 :Shipping Information"
        orderlabel.innerHTML=" Step 2 :Order Detail"
        paymentlabel.innerHTML="Step 3:Payment"
    }
}
catch{
    console.log("dont worry")
}
//-------------------------------------------- payment button ---------------------------------------
try{
var button1 = document.getElementById('continue')
button1.addEventListener('click',function(e){
    
    if (user == "AnonymousUser"){
    let uname = document.getElementById('uname').value
        let surname = document.getElementById('surname').value
        let email = document.getElementById('email').value
        let phonenumber = document.getElementById('phone number').value

        let fname = document.getElementById('fname').value
        let city = document.getElementById('city').value
        let country = document.getElementById('country').value
        let state = document.getElementById('state').value
        let zipcode = document.getElementById('zipcode').value
        let address = document.getElementById('address').value
        let amount = document.getElementById('amount').value

        console.log("i am clicked")
        console.log('submitted')
        
        let xhr = new XMLHttpRequest()

        xhr.open('POST','/shipping/',true)
        xhr.getResponseHeader('Content-type','application/json');

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
              console.log("status is good")
              if(xhr.status == 200) { 

                
                var a= JSON.parse(xhr.responseText)
                console.log(a)
                
                amount = a.amount
                orderid = a.orderid
                customerid = a.customerid
                console.log(customerid)
                console.log(amount)
                console.log(orderid)
                

                var dataForm = document.getElementById("dataForm")
                console.log(dataForm)
                var tcustid = document.getElementById("tcustid")
                var tamount = document.getElementById("tamount")
                var torderid = document.getElementById("torderid")
                
                
                tamount.value = amount
                torderid.value = orderid
                tcustid.value = customerid

                dataForm.submit()
                cart = {}
                document.cookie = "cart="+ JSON.stringify(cart) +"; path=/;";

              } 
              else {
                console.log("error occured")
              } 
            }
          }

        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        
        var data = {'name':'form1','uname':uname,'surname':surname,'email':email,'phonenumber':phonenumber,'fname':fname,'city':city,'country':country,'state':state,'zipcode':zipcode,'address':address,'amount':amount}
        
        var body = JSON.stringify(data)
        xhr.send(body)
        

        
    }
    else{
        let fname = document.getElementById('fname').value
        let city = document.getElementById('city').value
        let country = document.getElementById('country').value
        let state = document.getElementById('state').value
        let zipcode = document.getElementById('zipcode').value
        let address = document.getElementById('address').value
        let amount = document.getElementById('amount').value
        


        let xhr = new XMLHttpRequest()

        xhr.open('POST','/shipping/',true)
        xhr.getResponseHeader('Content-type','application/json');

        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        
        var data = {'fname':fname,'city':city,'country':country,'state':state,'zipcode':zipcode,'address':address,'amount':amount}
        
        var body = JSON.stringify(data)

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
              console.log("status is good")
              if(xhr.status === 200) { 
                var a= JSON.parse(xhr.responseText)
                console.log(a)
                customerid = a.customerid
                amount = a.amount
                orderid = a.orderid
                
                var dataForm = document.getElementById("dataForm")
                console.log(dataForm)
                var tcustid = document.getElementById("tcustid")
                var tamount = document.getElementById("tamount")
                var torderid = document.getElementById("torderid")
               
                tamount.value = amount
                torderid.value = orderid
                tcustid.value = customerid

                dataForm.submit()

                
              } 
              else {
                console.log("error occured")
              } 
            }
          }




        xhr.send(body)
        console.log("payment is sucessful")

        
    }
    
   
})
    
}
catch{
    console.log("i am executed again")
}


try{


    if(user != "AnonymousUser"){
        var button = document.getElementById("button-1")
        button.addEventListener("click",function(){

            var quantityadded = document.getElementById("quantityadded")
            console.log(quantityadded)

            var count = parseInt(quantityadded.innerHTML)
            console.log(count)


            var url = window.location.href
            console.log(url)
            var xhr = new XMLHttpRequest();
            xhr.open("POST",url,true)
    
            data = {"quantity":count}
    
            xhr.send(JSON.stringify(data))
        })
    }
}
catch{
    
}

