'use client'
import { logOut } from "@/lib/auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="container">
      <nav className="navbar">
        <Link href={"/"} className="logo">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            loading="eager"
          />
          <span>Ojors</span>
        </Link>

        <div className="menuItems">
          <Link href={"/jobs"}>Jobs</Link>
          <Link href={"/jobs/post"}>Post Job</Link>
          <Link href={"/hire"}>Hire</Link>
          <Link href={"/skill"}>Skills</Link>
          {session ? (
            <>
              <div className="logged">
                <Link href={"/jobs/post"}>Post Job</Link>

                <Link href={"/profile"}>Profile</Link>
                <button onClick={logOut}>Log Out</button>
              </div>
            </>
          ) : (
            <>
              <Link href={"/auth/signin"} className="loginBtn">
                Log in
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar
