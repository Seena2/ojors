'use client'
import React, { FormEvent } from 'react'

function PostJobPage() {
    const handleSubmit= async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData= new FormData(e.currentTarget)
        // specify how data should look when send to prism client 
        const data={
            title: formData.get('title'), //get title from input name attribute
            company: formData.get('company'),
            location: formData.get('location'),
            jobType: formData.get('jobType'),
            description: formData.get('description'),
            salary: formData.get('salary'),
        }
        try{
            // use create new job route from "api" to create the data
            await fetch('api/jobs',{
                method:'POST',
                headers: { "Content-Type": "application/json",},
                body:JSON.stringify(data)
            })
            // Redirect user
            window.location.href= "/jobs"
        }catch(error){
            console.error(error);
        }
    }
    
  return (
    <div>
        <h2>Post a job</h2>
        <form action="" onSubmit={handleSubmit}>
            <div className="formGroup">
                <label htmlFor="title">Job title</label>
                <input type="text" name='title' id='title'  required/>
            </div>
            <div className="formGroup">
                <label htmlFor="company">Company </label>
                <input type="text" name='company' id='company'  required/>
            </div>
            <div className="formGroup">
                <label htmlFor="location">Location </label>
                <input type="text" name='location' id='location'  required/>
            </div>
            <div className="formGroup">
                <label htmlFor="jobType">Job type </label>
                <select name='jobType' id='jobType'  required>
                    <option value="">Select job type</option>
                    <option value="fulltime">Full time</option>
                    <option value="part-time">Part time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    </select>
            </div>
            <div className="formGroup">
                <label htmlFor="description">Description </label>
                <textarea name='description' id='description' rows={6}  required/>
            </div>
            <div className="formGroup">
                <label htmlFor="salary">Salary(Optional) </label>
                <input type="text" name='salary' id='salary'  />
            </div>
            <button type='submit'>Post job</button>
        </form>
    </div>
  )
}

export default PostJobPage
