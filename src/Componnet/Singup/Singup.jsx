import React, { useRef, useState } from 'react'
import Container from '../Container'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import app from '../Firebase/Firebase'
import { Link } from 'react-router-dom'

const Singup = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const useRefmail= useRef()
    const auth = getAuth(app); 
    const loginsubmit = (e) =>{
        e.preventDefault();
        const email = e.target.gmail.value;
        const password = e.target.password.value;
        
        // Clear previous messages
        setSuccessMessage('');
        setError('');

        signInWithEmailAndPassword(auth , email , password)
        .then(result =>{
            console.log(result.user);
            setSuccessMessage('You have successfully Login');
              // Clear the input fields
             e.target.reset();
        })
      .catch(error =>{
        console.error(error)
        setError(error.message)
        })
    }
    const handelForgotpassword = () =>{
        const getmail = useRefmail.current.value
        if(!getmail){
            alert('plz give Gmail'); 
            return; 
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(getmail)
        ){

            alert('plz write valide gmail');
            return;
        }
        sendPasswordResetEmail(auth , getmail)
        .then(()=>{
            alert('plz cheack you gmail')
        })
        .catch(error=>{
            console.log(error);
            
        })
    }
  return (
    <>
    <Container>
        <div className='w-[500px] mx-auto border-2 border-black py-5 px-5 my-8'>
        <h1 className='text-6xl text-black font-bold text-center py-4'>SingUp</h1>
        <form onSubmit={loginsubmit}>
            <div>
            <label className='text-black font-bold py-[5px] block' htmlFor="">Your Gmail</label><br/>
            <input className='w-full py-3 px-2 outline-none border-2 border-gray-400' type="text" ref={useRefmail} name="gmail" id="gmail" required/>
            </div>
            <div>
            <label className='text-black font-bold py-[5px] block' htmlFor="">Your Password</label><br/>
            <input className='w-full py-3 px-2 outline-none border-2 border-gray-400' type="password" name="password" id="password" required/>
            </div>
            <input className='w-full py-3 px-2 outline-none border-2 border-gray-400 mt-2' type="submit" value="Submit" />
        </form>
        <a href="#" className=' ' onClick={handelForgotpassword}>Forgot Password</a>
           {/* Success and error messages */}
           <div className="flex justify-center pb-7">
          {successMessage && <p className="text-green-500 font-bold">{successMessage}</p>}
          {error && <p className="text-red-700 font-bold">{error}</p>}
        </div>
        <div className="flex justify-center">
            <p className='text-black font-bold'>If you have a no Reg: plz <Link to={'/login'}>Regstaion</Link></p>
        </div>
        </div>

    </Container>
    </>
  )
}

export default Singup