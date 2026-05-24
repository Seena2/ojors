import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const recentJobs = await prisma.job.findMany({
    take: 3,
    orderBy: { postedAt: "desc" },
    include: { postedBy: { select: { name: true } } },
  });
  return (
    <>
      <h1> Welcome to Ojors</h1>
      <h3>Find your dream jobs</h3>
      <p>Discover thousends of job opportinities with dream companies</p>
      <div className="hero">
        <ul>
          <li>
            Get started by editing<code>app/page.tsx</code>
          </li>
          <li>save and veiw cahnges instantly</li>
        </ul>
      </div>
    </>
  );
}
