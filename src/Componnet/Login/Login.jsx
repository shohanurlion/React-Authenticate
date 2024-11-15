import React, { useState } from 'react';
import Container from '../Container';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../Firebase/Firebase';
import { Link } from 'react-router-dom';

const Login = () => {
  // State to store user data, success message, and error message
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Initialize Firebase authentication and providers
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // Handle form submission for email/password registration
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Check if password length is valid
    if (password.length < 6) {
      setError('Password needs to be at least 6 characters');
      return;
    }

    // Clear previous messages
    setSuccessMessage('');
    setError('');

    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const newUser = result.user;
        setUser(newUser);
        setSuccessMessage('You have successfully registered');
        sendEmailVerification(result.user)
        .then(()=>{
          alert('plz verification you gmail');
          
        })
        // Clear the input fields
        e.target.reset();
      })
      .catch((error) => {
        setError(error.message); // Display error message
      });
  };

  // Handle Google sign-in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const googleUser = result.user;
        setUser(googleUser);
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
  };

  // Handle GitHub sign-in
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const githubUser = result.user;
        setUser(githubUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Clear user data on logout
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        {/* Registration form */}
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-10">
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="flex items-start mb-5">
            <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
        <div className="flex justify-center">
            <p className='text-black font-bold'>if you have a account plz <Link to={'/singup'}>Login</Link></p>
        </div>
        {/* Success and error messages */}
        <div className="flex justify-center pb-7">
          {successMessage && <p className="text-green-500 font-bold">{successMessage}</p>}
          {error && <p className="text-red-700 font-bold">{error}</p>}
        </div>

        {/* Social login buttons */}
        <div className="flex justify-center items-center mb-10">
          <button onClick={handleGoogleSignIn} className="text-[24px] gap-5 w-[40px] h-[40px] rounded-full bg-slate-300 flex justify-center items-center mr-5"><FcGoogle /></button>
          <button onClick={handleGithubSignIn} className="text-[24px] gap-5 w-[40px] h-[40px] rounded-full bg-slate-300 flex justify-center items-center mr-5"><FaGithub /></button>
          <button className="text-[24px] gap-5 w-[40px] h-[40px] rounded-full bg-slate-300 flex justify-center items-center mr-5"><FaFacebookF /></button>
        </div>

        {/* Display user information if logged in */}
        <div className="flex justify-center items-center">
          {user && (
            <div>
              <h3 className="text-[24px] font-bold">{user.displayName}</h3>
              <p>{user.email}</p>
              <img src={user.photoURL} alt="User profile" />
            </div>
          )}
        </div>

        {/* Logout button if user is logged in */}
        {user && (
          <div className="flex justify-center items-center my-4">
            <button className="p-2 border-2 border-black" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Login;
