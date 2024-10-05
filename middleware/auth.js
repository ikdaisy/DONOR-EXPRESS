import jwt from "jsonwebtoken"
import userSchema from "../models/user.model.js"
const {verify}=jwt



export default async function Auth(req,res,next) {
    try {
        console.log("middleware");
    console.log(req.headers);
    const key = req.headers.authorization
    console.log(key);
    if(!key)
        return res.status(403).send({msg:"Unauthorized access"})
    //get the key only without the word bearers
    const token = key.split(" ")[1]
    // console.log(token);
    //take the user details from the token
    const auth = await verify(token,process.env.JWT_KEY)
    console.log(auth);
    //find if the userId in the token exist in our db
    const user = await userSchema.findOne({_id:auth.userId})
    console.log(user);
    //pass the username from the user with request in a variable
    req.user=user.username
    // console.log(req.user);
    next()
    } catch (error) {
       return res.status(404).send({msg:"Session has expired!! Please login again"})
        
    }    
}