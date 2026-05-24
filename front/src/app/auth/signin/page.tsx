import LoginForm from "@/components/forms/LoginForm";
import { logIn } from "@/lib/auth";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

function Signin() {
  return (
    <div className="loginContainer">
      <div className="loginOptions">
        <h2>Welcome to Ojors, </h2>
        <p>
          Sign in to post job, hire professionals or appy for job
          opportunities{" "}
        </p>
        <div className="signinOptionBtns">
          <button>
            <Mail size={22}></Mail> <span>Continue using email</span>{" "}
          </button>
          <button onClick={logIn}>
            <FaGithub size={23} />
            <span>Continue with GitHub</span>
          </button>
        </div>
        <div>
          <p className="terms">
            By signing in you agreed to our <a>terms of service</a> and{" "}
            <a>Privacy policy</a>
          </p>
        </div>
        {/* <LoginForm /> */}
      </div>
    </div>
  );
}

export default Signin;
