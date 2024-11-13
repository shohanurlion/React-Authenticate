
import React, { useState } from 'react'
import Container from '../Container'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { getAuth, signInWithPopup,GoogleAuthProvider, signOut, GithubAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase/Firebase';

const Login = () => {
  const [user , setuser]=useState(null);
  const auth = getAuth(app);
  const provider= new GoogleAuthProvider();
  const githubprovider = new GithubAuthProvider();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const newUser = result.user;
        setuser(newUser);
  
        // Clear the input fields
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  const handelgooglesing =()=>{
   signInWithPopup(auth , provider)
    .then(result=>{
      const singuser= result.user;
      setemail(singuser);
      
    })
    .catch(error=>{
      console.log('error', error.message);
      
    })
  }

  const githubhandel = ()=>{
    signInWithPopup(auth, githubprovider)
    .then(result=>{
      const githubsin= result.user;
      setuser(githubsin)
    })
    .catch(error=>{
      console.log(error);
      
    })
  }

  const logouthandel =()=>{
    signOut(auth)
    .then(result=>{
      console.log(result);
      setuser(null)
    })
    .catch(error=>{
      console.log(error);
      
    })
  }
  return (
  <>
  <Container>
  <form onSubmit={handleSubmit} class="max-w-sm mx-auto my-14">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" name='email' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" name='password' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
<div className='flex justify-center items-center mb-10'>
 <button onClick={handelgooglesing} className='text-[24px] gap-5 w-[40px] h-[40px] rounded-full bg-slate-300 flex justify-center items-center mr-5'><FcGoogle /></button>
 <button className='text-[24px] gap-5 w-[40px] h-[40px] rounded-full bg-slate-300 flex justify-center items-center mr-5' onClick={githubhandel}><FaGithub /></button>
 <button className='text-[24px] gap-5 w-[40px] h-[40px] rounded-full bg-slate-300 flex justify-center items-center mr-5'><FaFacebookF /></button>
</div>
<div className='flex justify-center items-center'>
    {user && <div>
      <h3 className='text-[24px] font-bold'>{user.displayName}</h3>
      <p>{user.email}</p>
      <img src={user.photoURL} alt="gfg"/>
      </div>}
</div>
{user ? <div className='flex justify-center items-center my-4'>
  <button className='p-2 border-2 border-black' onClick={logouthandel}>Logout</button>
</div>: ''}

  </Container>

  </>
  )
}

export default Login