import { prisma } from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ApplyButton from './ApplyButton';

async function JobDetailsPage({params}:{params:Promise<{id:string}>}) {
    const jobId=(await params).id;
    const job = await prisma.job.findUnique({
        where:{id:jobId},
        include:{postedBy:true}
    });
    if(!job){
        notFound(); //redirect user to 404 page
    }
  return (
    <div>
        <Link href={"/jobs"}>Back to jobs</Link>
        <h1>{job.title}</h1>
        <p>{job.company}</p>
        <div className="">
            <span>{job.location}</span>
            <span>-</span>
            <span>{job.type}</span>
            {job.salary &&(<>
                <span>-</span>
                <span>{job.salary}</span>
                </>)}
        </div>
        <div className="">
            <span>Posted by: {job.postedBy.name} </span>
            <span> - </span>
            <span>{formatDistanceToNow(new Date(job.postedAt),{addSuffix:true})}</span>
        </div>
        <div className="">
            <h3>Job description</h3>
            <p>{job.description}</p>
        </div>
        <div className="">
            <ApplyButton jobId={job.id}/>
        </div>
      
    </div>
  )
}

export default JobDetailsPage
