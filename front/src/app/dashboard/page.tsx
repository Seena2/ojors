import { auth } from '@/auth'
import { prisma } from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function DashboardPage() {
    const session= await auth();
    if(!session?.user.id){
        redirect('auth/signin')
    }
    //  promise.all allow us to make multiple/2 promises at same time
    const [applications, postedJobs]= await Promise.all([
      // applications query
        prisma.application.findMany(
          {where:{userId:session.user.id},
          include:{job:{include:{postedBy:true}}},
          orderBy:{AppliedAt:'desc'}
        }),
        // jobs query
        prisma.job.findMany({where:{postedById:session.user.id},
        include:{_count:{select:{applications:true}}},
        orderBy:{postedAt:'desc'}
      })
     ])

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex justify-between items-center mb-6">
        <h3>Posted jobs</h3>
        <Link href={'jobs/post'}>Post new job</Link>
      </div>
      <div className="">
        <h3>Posted jobs</h3>
        <div className="">
          {postedJobs.length===0 ?(<p>You haven't any job yet</p>):(
            postedJobs.map((job)=>(
              <div key={job.id}>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <div>
                  <span>{job.location}</span><span>-</span><span>{job.type}</span>
                  <span>-</span>
                  <span>{formatDistanceToNow(new Date(job.postedAt),{addSuffix:true})}</span>
                </div>
                <div> <span>{job._count.applications} applications</span></div>
                <Link href={`/jobs/${job.id}`}>Veiw job</Link>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="">
        <h3>Applications</h3>
        <div className="">
          {applications.length===0 ?(<p>You haven't applied to any job yet</p>):(
            applications.map((application)=>(
              <div key={application.id}>
                <h3>{application.job.title}</h3>
                <p>{application.job.company}</p>
                <div>
                  <span>{application.job.location}</span><span>-</span><span>{application.job.type}</span>
                  <span>-</span>
                  <span>Applied {formatDistanceToNow(new Date(application.AppliedAt),{addSuffix:true})}</span>
                </div>
                <div>
                  <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium
                    ${application.status==='PENDING'?'bg-yellow-100 text-yellow-800':
                    application.status==='ACCEPTED' ?'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>
                      {application.status}</span>
                </div>
                <Link href={`/jobs/${application.job.id}`}>Veiw job</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
