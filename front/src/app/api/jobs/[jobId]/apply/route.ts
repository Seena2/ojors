// jobs/jobId/appy
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create new job
export async function POST(request: Request,{params}:{params:Promise<{jobId:string}>} ){
    // destructur jobId from the params
    const{jobId}= await params;
    // check if user is authenticated
    const session = await auth()
    if(!session?.user || !session.user.id){
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    try {
        const job = await prisma.job.findUnique({where:{id:jobId}})
        if(!job){
            return new NextResponse("Job not found",{status:404});
        }
        // check if user already applied for this job
        const existingApplication= await prisma.application.findFirst({
            where:{jobId:jobId, userId: session.user.id}
        })
        if(existingApplication){
             return new NextResponse("you have already applied for this job",{status:400});
        }
        // create the application
        const application= await prisma.application.create({
            data:{jobId:jobId, userId:session.user.id, status:"PENDING"}
        })
        
        return NextResponse.json(application)
    } catch (error) {
        console.error('Error creating application:', error);
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