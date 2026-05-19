import express from 'express';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config"

// initialize the express app
const app= express();
// initialize the prisma cleint using postgres adapter and driver
const pool= new Pool({connectionString:process.env.DATABASE_URL});
const adapter= new PrismaPg(pool);
const prisma = new PrismaClient({adapter});
// MIDDLEWARES
app.use(express.json());

// ROUTES
app.get('/users',async(req,res)=>{
    /* Get single user
       const users = await prisma.user.findFirst();//returns the first record & retuns null if data is not found
       const users = await prisma.user.findFirstOrThrow(); // gets the 1st data and throws an error if data is not found
    // returns the  user  that fulfill the condition specified on unique field
       const userr = await prisma.user.findUnique({
          // where:{name:'kenna'}, //error, hence "name" is NOT unique field
        where:{email:'kenna@gmail.com'}
     }); 
    */ 
    // Get multiple user
    /*
      const users = await prisma.user.findMany(); // returns all the data in the table
    // returns all married user
       const users = await prisma.user.findMany({
          where:{isMarried: true}
       }); 
    // returns all married and above 30
     const users = await prisma.user.findMany({
        where:{isMarried: true, age:{gte:30}} 
     }); 
    //Get users who are brazilian OR above 25: (union)
     const users = await prisma.user.findMany({
       where:{
           OR:[{nationality:"Brazilian"}, {age:{gt:25}}]
        } 
     }); 
    //Get users who are married and above 25
     const users = await prisma.user.findMany({
     where:{
           AND:[{nationality:"Brazilian"}, {age:{gt:25}}]
       } 
     }); 
    // Negations
    const users = await prisma.user.findMany({
       where:{
           nationality:{not:"Brazilian"}, 
       } 
    }); 
    // Range
    const users = await prisma.user.findMany({
        where:{
            // OR: [{nationality:'Spain'},{nationality:'Brazilian'},{nationality:'Chad'}] //same result bur verbose
            nationality: {in:['Spain',"Brazilian",'Chad']} 
        } 
    }); 
    res.json(users);
*/
 const allUsers= await prisma.user.findMany();
 console.log(allUsers);
})

// Update
app.


const PORT = process.env.PORT || 5002
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`);
})
