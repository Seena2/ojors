import React from 'react'

function LoginForm() {
  return (
    <div>
      <form action="" className='loginForm'>
        <label htmlFor="name">User name</label>
        <input type="text" id='name'/>
        <label htmlFor="email">Email</label>
        <input type="email" id='email'/>
        <button>Sign in</button>
      </form>
    </div>
  )
}

export default LoginForm
