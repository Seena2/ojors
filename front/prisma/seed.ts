import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config"

const pool= new Pool({connectionString:process.env.DATABASE_URL});
const adapter= new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

async function seed() {
    await prisma.user.createMany({
        data:[
            {name:"Kenna Bareddu", email:'kenna@gmail.com', gender:"FEMALE", age:8, isMarried:false,nationality:"Oromian"},
            {name:"Hikma Qashti", email:'hiku@gmail.com', gender:"FEMALE", age:4, isMarried:false,nationality:"Canadian"},
            {name:"John Doe", email:'johndoe@gmail.com',gender:"MALE", age:25, isMarried:true,nationality:"Brazilian"},
            {name:"Jane Doe", email:'jane@gmail.com',gender:"FEMALE",age: 30, isMarried:true,nationality:"Spain"},
        ]
    })
}

seed(). then(async()=>{ await prisma.$disconnect()}) .catch(async(error)=>{
        console.error(error.message);
        await prisma.$disconnect();
        process.exit(1);
    }) .finally(async()=>{await prisma.$disconnect()})