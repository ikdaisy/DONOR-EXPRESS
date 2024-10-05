let donors;
const Token = localStorage.getItem("Token")
console.log(Token);

Token?document.getElementById("buttons").innerHTML=` <span id="username"></span>
              
                <a href="./index.html"><li>Home</li></a>
               <a href="./pages/add.html"> <li>Add Donor</li></a>
               
               <a href="" onclick="signOut()"> <li>Sign Out </li></a>`:document.getElementById("buttons").innerHTML=` <span id="username"></span>
              
                <a href="./index.html"><li>Home</li></a>
               <a href="./pages/add.html"> <li>Add Donor</li></a>
               <a href="./pages/signup.html"> <li>Sign Up </li></a>`


async function getDonors(){
    const  res= await fetch("http://localhost:3002/api/getdonors",{headers:{"authorization":`Bearer ${Token}`}})
    console.log(res);
    donors = await res.json()


   if(res.status==200){
    console.log(donors);
   
 
    
    str=``
    donors.donors.map((donor)=>{
        // console.log(donor._id);
        // console.log(donor.name);
         document.getElementById("username").textContent=donors.user
        str+=` <div>
                        
                        <tr>
                            <td><div id="name">${donor.name}</div></td>
                           
                            <td><div id="age">${donor.age}</div></td>
                            <td><div  id="dob">${donor.dob}</div></td>

                            <td><div id="phone">${donor.phone}</div></td>
                             <td><div id="place">${donor.place}</div></td>
                            <td><div id="bloodgroup">${donor.bloodgroup}</div></td>
                          
                            
                            
                            <td> <a href="./pages/edit.html?id=${donor._id}"><button class="edit-btn" >EDIT</button></a>
                                <!-- <button class="save-btn"  >SAVE</button> -->
                                <button class="delete-btn" onclick="deleteDonor('${donor._id}')" >DELETE</button></td>

                        </tr>
                </div>`
        
    })
    document.getElementById("main").innerHTML=str
   }
   else{
    alert(donors.msg)
    // alert("Unable to fetch data")
   }
    
    

}
getDonors()

// Search

document.getElementById("search").addEventListener("keyup",(e)=>{
    console.log(e.target.value);
    // console.log(donors);
    let fData=donors.filter((donor)=>donor.bloodgroup.toLowerCase().startsWith(e.target.value.toLowerCase()));
    str=``

    fData.map((donor)=>{
        str+=`      <tr>
                        <td><div id="name">${donor.name}</div></td>
                        <td><div id="age">${donor.age}</div></td>
                        <td><div id="dob">${donor.dob}</div></td>
                        <td><div id="phone">${donor.phone}</div></td>
                        <td><div id="place">${donor.place}</div></td>
                        <td><div id="bloodgroup">${donor.bloodgroup}</div></td>
                        </td>
                        <td> <a href="./pages/edit.html?id=${donor._id}"><button class="edit-btn" >EDIT</button></a>
                            <button class="delete-btn"  id="dlt" onclick="deleteDonor('${donor._id}')">DELETE</button></td>

                    </tr>`

    })
    document.getElementById("main").innerHTML=str  

    
})

// Delete

async function deleteDonor(id){
    console.log(id); 
    if(confirm("Do You Want To Delete The Employee?")){
        const res=await fetch(`http://localhost:3002/api/deletedonor/${id}`,{
            method:"DELETE"
        })

        if(res.status==200){
            let data=await res.json()
            alert(data.msg)
            getDonors()
    
        }
        else{
            alert("Failed To Delete");
        }
    }  
}


function signOut(){
    localStorage.removeItem("Token")
}