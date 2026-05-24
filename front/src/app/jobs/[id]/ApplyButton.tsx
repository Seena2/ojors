'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function ApplyButton({jobId}:{jobId:string}) {
  const [errorMessage, setErrorMessage]= useState<string>("");
  const [applicationStatus, setApplicationStatus]= useState<"idle"|"success"| "error">("idle")
  // get session data to check if the user is authenticated before appying
  const{data:session, status}= useSession();
  const router= useRouter();
  const handleApply=async()=>{
    if(!session){
      router.push('/auth/signin')
      return
    }
    setErrorMessage("");
    setApplicationStatus("idle")
    try {
      // add the data to the application table using the POST method in the "api/jobs/[jobId]/apply/routes.ts"
      const response = await fetch(`/api/jobs/${jobId}/apply`,{ method:"POST"})
      setApplicationStatus("success")
    } catch (error) {
      if(error instanceof Error){
        setErrorMessage(error.message)
      }else{
        setErrorMessage('Failed to apply for the job');
      }
      setApplicationStatus("error")
      console.error('error')
      
    }
  }
  if (status==='loading'){
    return  <button disabled>Loading...</button>
  }
  if(applicationStatus==="success"){
    return <div> <p>Appication submitted successfully!</p>
    <Link href={'/dashboard'}>View your applications</Link></div>
  }
  return (
    <>
      <button onClick={handleApply}>Apply for this position</button>
      {applicationStatus ==="error" && (<p>{errorMessage}</p>)}
    </>
  )
}

export default ApplyButton
