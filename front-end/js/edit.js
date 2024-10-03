const url=window.location.href
console.log(url);
const urlParams=new URLSearchParams(url.split("?")[1])
console.log(urlParams);
const id=urlParams.get("id");
console.log(id);

async function getDonor(){
    const res=await fetch(`http://localhost:3002/api/getdonor/${id}`);
    console.log(res);
    const donors=await res.json()
    console.log(donors);
    document.getElementById("forms").innerHTML=`<table>
                    <tr>
                            <td>
                                    <label for="name">Name</label>
                            </td>
                            <td class="input" >
                                    <input type="text" name="name" id="name" value="${donors.name}">
                                    <!-- <p id="errorMessage"></p> -->
                            </td>
    
                    </tr>
                   
                    <tr>
                            <td>
                                <label for="age">Age</label>
                            </td>
                            <td class="input">
                                <input type="text" name="age" id="age" value="${donors.age}" >
                            </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="dob">Date Of Birth</label>
                        </td>
                        <td class="input">
                            <input type="text" name="dob" id="dob" value="${donors.dob}" >
                        </td>
                </tr>
                    <tr>
                            <td>
                                    <label for="phone">Phone</label>
                            </td>
                            <td class="input">
                                <input type="text" name="phone" id="phone" value="${donors.phone}">
                                
                            </td>
                    </tr>
                    <tr>
                        <td>
                                <label for="place">Place</label>
                        </td>
                        <td class="input">
                            <input type="text" name="place" id="place" value="${donors.place}">
                            
                        </td>
                </tr>
                    <tr>
                            <td>
                                <label for="bloodgroup">BloodGroup</label>
                            </td>
                            <td class="input">
                                <select name="Bgroup" id="Bgroup" disabled="true">
                                 <option>${donors.bloodgroup}</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </td>
                    </tr>
                   
                    <tr>
                        <td>
                         <input type="submit" value="UPDATE" id="add-btn" class="button">
    
                        </td>                
                    </tr>
                </table>`
}
getDonor()

// Update 

document.getElementById("forms").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const name=document.getElementById("name").value
    const age=document.getElementById("age").value
    const dob=document.getElementById("dob").value
    const phone=document.getElementById("phone").value
    const place=document.getElementById("place").value
    const bloodgroup=document.getElementById("Bgroup").value
    console.log(name,age,dob,phone,place,bloodgroup);
    console.log(id);
   
    

    const res=await fetch(`http://localhost:3002/api/updatedonor/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,age,dob,phone,place,bloodgroup})

    })
    
    if(res.status==201){
        const data=await res.json()
        console.log(data);
        alert(data.msg)
        getDonor()
        window.location.href="../index.html"
    }
    else{
        const data=await res.json()
        alert(data.msg)
    }
    
    
})

