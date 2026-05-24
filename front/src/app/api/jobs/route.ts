import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// Create new job
export async function POST(request: Request ){
// check if user is authenticated
const session = await auth()
if(!session?.user || !session.user.id){
    return NextResponse.redirect(new URL('/auth/signin', request.url));
}
try {
    // get data from request
    const data = await request.json()
    // create the record into the db using prisma client and "job" model
    const newJob = await prisma.job.create({
        data:{ ...data, postedById: session.user.id, }
    })
    return NextResponse.json(newJob)
} catch (error) {
    console.error('Error creating job:', error);
    return new NextResponse("Internal server error", {status:500})
}
}
// get jobs
export async function GET(request: Request ){
    try {
        const jobs= await prisma.job.findMany({
            orderBy:{postedAt:'desc'},
        })
        return NextResponse.json(jobs)
    } catch (error) {
        console.error('Error creating job:', error);
        return new NextResponse("Internal server error", {status:500})
    }
}