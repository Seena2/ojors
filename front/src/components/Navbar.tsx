'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function Navbar() {
    const [isLogged, setIsLogged]=useState(false)
  return (
    <div className="container">
        <nav className='navbar'>
     
        <Link href={"/"} className="logo">
            <Image src='/logo.png' alt='logo' width={40} height={40} loading='eager'/>
            <span >Ojors</span>
        </Link>

        <div className="menuItems">
                <Link href={'/jobs'}>Jobs</Link>
                <Link href={'/jobs/post'}>Post Job</Link>
                <Link href={'/hire'}>Hire</Link>
                <Link href={'/skill'}>Skills</Link>
                {isLogged ? (<>
                <div className='logged'>
                    <Link href={"/signout"}>Sign Out</Link>
                    <Link href={"/profile"}>Profile</Link>
                </div>
                </>): (<>
                <Link href={"/auth/signin"}>Log in</Link>
                </>)}
            
        </div>
    
    </nav>
    </div>
  )
}

export default Navbar
