import express from "express"
import env from "dotenv"
import router from "./router.js"
import Connection from "./connection.js"

env.config()
const app= express()

app.use(express.json())
app.use(express.static('front-end'))
app.use("/api",router)

Connection().then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,()=>{
        console.log(`Server starting at http://localhost:${process.env.PORT}`);
        
    })
    

})


