import { $Enums, Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function JobsPage({searchParams}:{searchParams: Promise<{[key:string]:string | string[] | undefined}>}) {
    // destructure and cast the type
    const {q,type,location} = await searchParams
    const searchQuery= q as string | undefined;
    const searchLocation= location as string | undefined;
    const jobType=  type as Prisma.EnumJob_typeFilter<"Job"> | $Enums.Job_type | undefined //enum type
    // fetch data based on composite search(title,type &location) and order them
    const jobs = await prisma.job.findMany({
        where:{
            AND:[
                // if the first search term (title/company/description)  exists,
                // then perform case insensitive search else return empty object
                searchQuery?{
                OR:[ {title:{contains:searchQuery,mode:"insensitive"}},
                    {company:{contains:searchQuery,mode:"insensitive"}},
                    {description:{contains:searchQuery,mode:"insensitive"}},
                ],}:{},
                type ? { type: jobType}:{},
                location ? { location: {contains: searchLocation, mode:'insensitive'}}:{},
            ]
        },
        orderBy:{postedAt:"desc"},include:{postedBy: true}
    })
  return (
    <div>
        <div className="searchJob">
        <h1>Find Jobs</h1>
        <form action="">
            <input type="text" name='q' placeholder='Search jobs'/>
            <select name="jobType" id="">
                <option value="">All types</option>
                    <option value="fulltime">Full time</option>
                    <option value="part-time">Part time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
            </select>
            <input type="text" name='location' />
            <button type='submit'>Search</button>
        </form>
        </div>
        {/* list the jobs */}
        <div className="grid gap-6">
            {jobs.map((job)=>(
                <div key={job.id} className="singleJob">
                    <h2>{job.title}</h2>
                    <p>{job.company}</p>
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                    <p>{job.description}</p>
                    <div className="">
                        {job.salary &&(<span>{job.salary}</span>)}
                    </div>
                    <p>Posted by: <span>{job.postedBy.name}</span></p>
                    <Link href={`/jobs/${job.id}`}>View details...</Link>
                </div>
            ))}
        </div>

    </div>
  )
}

export default JobsPage
