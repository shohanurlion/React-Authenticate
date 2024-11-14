import React from 'react'
import Container from '../Container'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the login page
  };
const handlesingupClick = () =>{
  navigate('/singup'); //Redirect ot the singup page
}
  return (
    <>
      <Container>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li><NavLink to={'/'}>Home</NavLink></li>
                <li><NavLink to={'/about'}>About</NavLink></li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li className="mr-4"><NavLink to={'/'}>Home</NavLink></li>
              <li className="mr-4"><NavLink to={'/about'}>About</NavLink></li>
              <li className="mr-4"><NavLink to={'/service'}>Service</NavLink></li>
              <li className="mr-4"><NavLink to={'/contact'}>Contact</NavLink></li>
            </ul>
          </div>
          <div className="navbar-end">
            <button className="btn mr-4" onClick={handleLoginClick}>Singup</button>
            <button className="btn" onClick={handlesingupClick}>Login</button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
