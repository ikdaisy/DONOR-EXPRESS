
import donorSchema from "./models/donor.model.js"
import userSchema from "./models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const {sign}=jwt


//add donor
export async function addDonor(req,res){
    // console.log("hi");
    //sends a response
    // res.send({msg:"Hello"})
   try{
    console.log(req.body);
    const {name,age,dob,phone,place,bloodgroup}= req.body;
    //check whether input fields are empty 
    if(!(name&&age&&dob&&phone&&place&&bloodgroup)){
        return res.status(404).send({msg:"Fields are empty"})
    }
    const checkPhone=await donorSchema.findOne({phone})
    // console.log(checkPhone);
    if(!checkPhone){
        // console.log(name,gender,age,dob,phone,place,bloodgroup);
    donorSchema.create({name,age,dob,phone,place,bloodgroup}).then((data)=>{
      
        
        res.status(201).send({msg:data})
       

    }).catch((error)=>{
       
        res.status(404).send({msg:error})
    })

    }
    else{
        return res.status(404).send({msg:"Phone number already exists"})


    }

   }
    catch(error){
        res.status(404).send({msg:error})

    }
    
}
//get all donors from db and send response
export async function getDonors(req,res) {
    try{
        const donors = await donorSchema.find()
        // console.log(donors);
        // res.status(200).send({msg:donors})
        res.status(200).send({donors,user:req.user})
    }
    catch(error){
        res.status(404).send({msg:error})



    }
    
}

//get donor
export async function getDonor(req,res){
  try{
    console.log(req.params);
    const {_id}=req.params;
    console.log(_id);
    
    const data = await donorSchema.findOne({_id})
    console.log(data);
     res.status(200).send(data)
  }
  catch(error){
    res.status(404).send(error)

  }
}

// Update data

export async function updateDonor(req,res) {
    try {
        console.log(req.params);
       
        
        console.log(req.body);
        const _id=req.params;
        const {name,age,dob,phone,place,bloodgroup}=req.body
        if(!(name&&age&&dob&&phone&&place&&bloodgroup)){
            return res.status(404).send({msg:"Fields Are Empty"})
        }
        
        donorSchema.updateOne({_id},{$set:{name,age,dob,phone,place,bloodgroup}}).then(()=>{  
            console.log(req.body);    
           
                 
            res.status(201).send({msg:"Successfully Updated"})

        }).catch((error)=>{
            res.status(404).send(error)
        })
        
  
    } catch (error) {
        console.log(error);
    }
    
}

// delete data

export async function deleteDonor(req,res) {
    try {
        const _id=req.params
        console.log(_id);
        donorSchema.deleteOne({_id}).then(()=>{
            res.status(200).send({msg:"Deleted"})
            // window.location.reload()
    
        }).catch((error)=>{
            console.log(error);
            
        })
    } catch (error) {
        console.log(error);  
    }
    
}

//user registration / Sign Up

export async function signUp(req,res) {
    console.log(req.body);
    const {username,email,password,cpassword}=req.body
    if(!(username&&email&&password))
        return res.status(404).send({msg:"Fields are empty"})
    const userEmail = await userSchema.findOne({email})
    if(userEmail){
        return res.status(404).send({msg:"Email already exists"})

    }
    if(password!=cpassword)
        return res.status(404).send({msg:"Passwords doesnt match"})

    //Method 1 to hash password 
    //============================================================================================
    // bcrypt.hash(password,10).then(async(hashedPassword)=>{
    //     console.log(hashedPassword);
    //     await userSchema.create({username,email,password:hashedPassword}).then(()=>{
    //         res.status(201).send({msg:"Successfully registered"})

    //     }).catch((error)=>{
        
    //         res.status(404).send({msg:"Failed to register"})

    //     })
        

    // }).catch((error)=>{
    // return res.status(404).send({msg:error})


    // })

    //=============================================================================================
    //Method 2 to hash password 
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(password, salt, async function(err, hash) {
    //         // Store hash in your password DB.
    //         console.log(hash);
    //         await userSchema.create({username,email,password:hash}).then(()=>{
    //                     res.status(201).send({msg:"Successfully registered"})
            
    //                 }).catch((error)=>{
                    
    //                     res.status(404).send({msg:"Failed to register"})
            
    //                 })
            
    //     });

        
    // });
    //==============================================================================================
    //Method 3 to hash password 

    bcrypt.hash(password, 10, async function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        await userSchema.create({username,email,password:hash}).then(()=>{
                                res.status(201).send({msg:"Successfully registered"})
                    
                            }).catch((error)=>{
                            
                                res.status(404).send({msg:"Failed to register"})
                    
                            })
        
    });
}

// Sign In 

export async function signIn(req,res) {
    try {
       
        
        const {email,password}=req.body
    if(!(email&&password))
        return res.status(404).send({msg:"Fields are empty"})
    const user = await userSchema.findOne({email})
    if(!user){
        return res.status(404).send({msg:"Inavlid Email"})
    }
    const success = await bcrypt.compare(password,user.password)
    console.log(success);
    if(success!=true)
        return res.status(404).send({msg:"Invalid Password"})
    const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
    console.log(token);
    res.status(200).send({msg:"Logged in successfully",token})
    
    } catch (error) {
        console.log(error);
        
    }

    

    
    
}