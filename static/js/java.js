   
    /*
    var button = document.getElementById("button");

    button.addEventListener('submit',function(e){
       
        var uname = document.getElementById("uname");
        var surname =document.getElementById("surname");
        var email = document.getElementById("email");
        var phonenumber = document.getElementById("phone number");


        var unamevalue = uname.value.trim();
        var surnamevalue = surname.value.trim();
        var emailvalue = email.value.trim();
        var phonenumbervalue = phonenumber.value.trim();
        


        var lblname = document.getElementById("username");
        var lblsurname = document.getElementById("usersurname");
        var lblemail = document.getElementById("useremail");
        var lblnumber = document.getElementById("userphonenumber");
    
       if(unamevalue==""){
           console.log("value of name null")
           lblname.style.visibility="visible"
           lblname.innerHTML="please enter your name";
           uname.style.border="1px solid red";
           lblname.style.color="red";

           e.preventDefault();

       }
       else{
           console.log(unamevalue);
           lblname.style.visibility="hidden";
           uname.style.border="";
       }
       
       if(surnamevalue==""){
            console.log("value of surname null")
            lblsurname.style.visibility="visible"
            lblsurname.innerHTML="please fill this  ";
            surname.style.border="1px solid red";
            lblsurname.style.color="red";
           e.preventDefault();


         }
        else{
            console.log(surnamevalue);
            lblsurname.style.visibility="hidden";
            surname.style.border="";
        }

        var regx = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\.-]+)\.([a-zA-Z]{2,6}).([a-zA-Z]+)?$/
        if(emailvalue==""){
            console.log("value of email null")
            lblemail.style.visibility="visible";
            lblemail.innerHTML="please enter your email id";
            email.style.border="1px solid red";
            lblemail.style.color="red";
            e.preventDefault();



         }
        else{
            console.log(emailvalue);
            if(regx.test(emailvalue)){
                console.log("matches the pattern");
                lblemail.style.visibility="hidden";
                email.style.border="";
            }
            else{
                console.log("matching fail");
                lblemail.style.visibility="visible";
                lblemail.innerHTML="please enter valid email-id";
                email.style.border="1px solid red";
                lblemail.style.color="red";
                e.preventDefault();


            }
        }

        var regx2 = /^([7-9])([0-9]{9})$/

        if(phonenumbervalue==""){
            console.log("value of phonenumber is null");
            lblnumber.style.visibility="visible";
            lblnumber.innerHTML="please enter your number";
            lblnumber.style.color="red";
            phonenumber.style.border="1px solid red";
           e.preventDefault();


        }
        else{
            if(regx2.test(phonenumbervalue)){
                console.log("matches the pattern")
                lblnumber.style.visibility="hidden";
                phonenumber.style.border="";
            }
            else{
                console.log("not matches the string");
                lblnumber.style.visibility="visible";
                lblnumber.innerHTML="please enter any valid number";
                lblnumber.style.color="red";
                phonenumber.style.border="1px solid red";
                e.preventDefault();



            }
        }
        if(unamevalue!="" && surnamevalue!="" && phonenumbervalue!="" && regx2.test(phonenumbervalue) && emailvalue!="" && regx.test(emailvalue)){
            var a = document.getElementById("shipping-detail");
            a.style.display="block";
            
            var b = document.getElementById("user-detail");
            b.style.display="none";
            a.style.transition="all 5s";
        }
        
        
    })

  
    
    
    
   

    
    //---------------------shipping info--------------
    var shippingbtn = document.getElementById("button2");
   
    shippingbtn.addEventListener('click',function(e){
        
        
        var fname = document.getElementById("fname");
        var country = document.getElementById("country");
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        var address = document.getElementById("address");
        var zipcode = document.getElementById("zipcode");

        var fnamevalue =fname.value.trim();
        var countryvalue =country.value.trim();
        var cityvalue =city.value.trim();
        var statevalue =state.value.trim();
        var addressvalue =address.value.trim();
        var zipcodevalue =zipcode.value.trim();

        

        var firstname = document.getElementById("firstname");
        var countryname = document.getElementById("countryname");
        var cityname = document.getElementById("cityname");
        var statename = document.getElementById("statename");
        var addressname = document.getElementById("addressname");
        var zipcodename = document.getElementById("zipcodename");

        if(fnamevalue==""){
            console.log("value of naem is null")
            firstname.style.color="red";
            firstname.style.visibility="visible";
            firstname.innerHTML="please enter name";
            fname.style.border="1px solid red";
            e.preventDefault()
        }
        else{
            console.log(fnamevalue);
            firstname.style.visibility="hidden";
            fname.style.border="";
        }

        if(countryvalue==""){
            console.log("value of country is null")
            countryname.style.color="red";
            countryname.style.visibility="visible";
            countryname.innerHTML="please enter country";
            country.style.border="1px solid red";
            e.preventDefault()
        }
        else{
            console.log(countryvalue);
            countryname.style.visibility="hidden";
            country.style.border="";
        }

        if(cityvalue==""){
            console.log("value of city is null")
            cityname.style.color="red";
            cityname.style.visibility="visible";
            cityname.innerHTML="please enter city";
            city.style.border="1px solid red";
            e.preventDefault()
        }
        else{
            console.log(cityvalue);
            cityname.style.visibility="hidden";
            city.style.border="";
        }

        if(statevalue==""){
            console.log("value of state is null")
            statename.style.color="red";
            statename.style.visibility="visible";
            statename.innerHTML="please enter state";
            state.style.border="1px solid red";
            e.preventDefault()
        }
        else{
            console.log(statevalue);
            statename.style.visibility="hidden";
            state.style.border="";
        }

        if(addressvalue==""){
            console.log("value of city is null")
            addressname.style.color="red";
            addressname.style.visibility="visible";
            addressname.innerHTML="please enter adress";
            address.style.border="1px solid red";
            e.preventDefault()
        }
        else{
            console.log(addressvalue);
            addressname.style.visibility="hidden";
            address.style.border="";
        }

        var regx3 =/^([0-9]{6})$/

        if(zipcodevalue==""){
            console.log("value of zipcode is null")
            zipcodename.style.color="red";
            zipcodename.style.visibility="visible";
            zipcodename.innerHTML="please enter zipcode";
            zipcode.style.border="1px solid red";
            e.preventDefault()
        }
        else{
            if(regx3.test(zipcodevalue)){
                console.log(zipcodevalue);
                zipcodename.style.visibility="hidden";
                zipcode.style.border="";
            }
            else{
                console.log("pattern does not match");
                zipcodename.style.color="red";
                zipcodename.style.visibility="visible";
                zipcodename.innerHTML="please enter valid zipcode";
                zipcode.style.border="1px solid red";
                e.preventDefault()

            }
        }
        if(user=='AnonymousUsser'){

        }
        else if(fnamevalue!="" && countryvalue!="" && statevalue!="" && cityvalue!="" && zipcodevalue!="" && addressvalue!="" && regx3.test(zipcodevalue))
        {
            var c = document.getElementById("order-detail");
            c.style.display="block";
            var d = document.getElementById("shipping-detail");
            d.style.display="none";
            
        }
       
        
         

    })


*/
            
    