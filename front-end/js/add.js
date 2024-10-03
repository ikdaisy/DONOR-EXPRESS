document.getElementById("frm").addEventListener("submit",async (e)=>{
    // console.log("hii");
    // alert("hey")
    e.preventDefault()
    const name =document.getElementById("name").value;
   
    const age =parseInt(document.getElementById("age").value)
    const dob =document.getElementById("dob").value
    const phone =parseInt(document.getElementById("phone").value)
    const place =document.getElementById("place").value
    const bloodgroup =document.getElementById("bloodgroup").value
    // console.log(name,gender,age,dob,phone,place,bloodgroup);
    
    await fetch("http://localhost:3002/api/adddonor",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,age,dob,phone,place,bloodgroup}),
    }).then(async(res)=>{
        console.log(res);
        if(res.status==201){
            alert("Success")
            window.location.href="../index.html"
        }
        else{
            // alert("Failed")
            const errormsg = await res.json()
            console.log(errormsg);
            
            alert(errormsg.msg)
        }
        
    }).catch((error)=>{
        console.log(error);
        
    })
    

})


//Name validation
function validateName(name){
    let regEx=/^[A-Z,a-z]{3,}/

    if (!(regEx.test(name))){
        document.getElementById("invalid-name").textContent="Invalid"
        document.getElementById("invalid-name").style.color="red"
        document.getElementById("invalid-name").style.fontSize=13+"px"
        document.getElementById("invalid-name").style.fontWeight="bold"
        document.getElementById("invalid-name").style.display="block"
    }
    else{
        document.getElementById("invalid-name").textContent=""
        document.getElementById("invalid-name").style.display="none"
    }
    document.getElementById("name").addEventListener("keyup", function() {
        if (document.getElementById("name").value== "") {
            document.getElementById("invalid-name").textContent = "";
        }
    });


}

//phone validation

function validatePhone(phone){
    // console.log(phone);
    let regEx=/^[6-9]\d{9}/
    console.log(regEx.test(phone));
    
    if ((regEx.test(phone))){
        document.getElementById("phn").textContent=""
    }
    else{
        document.getElementById("phn").textContent="Phone Number Is Invalid"
        document.getElementById("phn").style.color="red"
        document.getElementById("phn").style.fontSize=12+"px"
        document.getElementById("phn").style.fontWeight="bold"




    }
    document.getElementById("phone").addEventListener("keyup", function() {
        if (document.getElementById("phone").value== "") {
            document.getElementById("phn").textContent = "";
        }
    });



}


//Age validation 
function validateAge(age){
    let regEx=/^[2-7][0-9]|[1][8-9]/
    if (!(regEx.test(age))){
        document.getElementById("invalid-age").textContent="Not Eligible"
        document.getElementById("invalid-age").style.color="red"
        document.getElementById("invalid-age").style.fontSize=12+"px"
        document.getElementById("invalid-age").style.fontWeight="bold"


    }
    else{
        document.getElementById("invalid-age").textContent=""

    }
    //to remove the invalid msg when the input is empty
    document.getElementById("age").addEventListener("keyup", function() {
        if (document.getElementById("age").value== "") {
            document.getElementById("invalid-age").textContent = "";
        }
    });

}

//Place validation
function validatePlace(place){
    let regEx=/^[A-Z,a-z]{3,}/
    if (!(regEx.test(place))){
        document.getElementById("invalid-place").textContent="Invalid"
        document.getElementById("invalid-place").style.color="red"
        document.getElementById("invalid-place").style.fontSize=13+"px"
        document.getElementById("invalid-place").style.fontWeight="bold"


    }
    else{
       document.getElementById("invalid-place").textContent=""

    }

    document.getElementById("place").addEventListener("keyup", function() {
        if (document.getElementById("place").value== "") {
            document.getElementById("invalid-place").textContent = "";
        }
    });
    
}

//dob validation 
// format YYYY-MM-DD
//YYYY represents the year (1900-2060)
// MM represents the month (01-12)
// DD represents the day (01-31)
function validateDOB(dob){
    // console.log(dob);
    let regEx=/^([1][9]\d{2}|[2][0][0][0-6])-([0][1-9]|[1][0-2])-([0][1-9]|[1-2]\d|[3][1-2])$/
    if (!(regEx.test(dob))){           
        document.getElementById("invalid-dob").textContent="Not Eligible"
        document.getElementById("invalid-dob").style.color="red"
        document.getElementById("invalid-dob").style.fontSize=13+"px"
        document.getElementById("invalid-dob").style.fontWeight="bold"


    }
    else{
        document.getElementById("invalid-dob").textContent="";
      

    }
    document.getElementById("dob").addEventListener("onchange", function() {
        if (document.getElementById("dob").value== "") {
            document.getElementById("invalid-dob").textContent = "";
        }
    });
}
