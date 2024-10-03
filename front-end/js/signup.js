document.getElementById("form").addEventListener("submit",async (e)=>{
    e.preventDefault()
    const username =document.getElementById("username").value;
    const email =document.getElementById("email").value;
    const password =document.getElementById("password").value;
    const cpassword =document.getElementById("cpassword").value;
    console.log(username,email,password,cpassword);
    await fetch("http://localhost:3002/api/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,password,cpassword}),
    }).then(async (res)=>{
        console.log(res);
        const data = await res.json()
        if(res.status==201){
            // alert("Success")
           
            alert(data.msg)
            window.location.href="../index.html"
        }
        else{
            alert(data.msg)
            
            
        }
        

    }).catch((error)=>{
        console.log(error);
        

    })
    





})

function emailValidation(email){
    let regEx=/^[a-z][a-z,0-9,.]+@[a-z]+([\.][a-z]{3})/
    if ((regEx.test(email))){
        document.getElementById("em").textContent=""
    }
    else{
        document.getElementById("em").textContent="Invalid"
        document.getElementById("em").style.color="red"
        document.getElementById("em").style.fontSize=16+"px"
        document.getElementById("em").style.fontWeight="bold"




    }
    document.getElementById("email").addEventListener("keyup", function() {
        if (document.getElementById("email").value== "") {
            document.getElementById("em").textContent = "";
        }
    });


    }


    function passwordValidation(password){
    
    let regEx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if ((regEx.test(password))){
            document.getElementById("error-pass").textContent=""
        }
        else{
            document.getElementById("error-pass").textContent="Invalid"
            document.getElementById("error-pass").style.color="red"
            document.getElementById("error-pass").style.fontSize=16+"px"
            document.getElementById("error-pass").style.fontWeight="bold"
    
    
    
    
        }
        document.getElementById("password").addEventListener("keyup", function() {
            if (document.getElementById("password").value== "") {
                document.getElementById("error-pass").textContent = "";
            }
        });
    
    
        }

        function confirmPasswordValidation(password,cpassword){
            console.log(password,cpassword);
            
            if(password!=cpassword){
                document.getElementById("error-cpass").textContent="Passwords doesn't match"
                document.getElementById("error-cpass").style.color="red"
                document.getElementById("error-cpass").style.fontSize=16+"px"
                document.getElementById("error-cpass").style.fontWeight="bold"

            }
            else{
                document.getElementById("error-cpass").textContent=""

            }

            
        }
    