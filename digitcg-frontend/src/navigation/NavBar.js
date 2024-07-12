import React, { useContext } from 'react';
import UserContext from '../auth/UserContext';
import { NavLink } from 'react-router-dom';
import "./NavBar.css"

function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext)
    return (
        <>

            {currentUser ? <ul className='navbar'>
                <li className='nav'>
                    <NavLink exact to="/">Home</NavLink>
                </li>

                <li className='nav'>
                    <NavLink exact to="/build">Build Deck</NavLink>
                </li>
                <li className='logout'>
                    <NavLink to="/" onClick={logout} >Log out</NavLink>

                </li>

            </ul>
                : <ul className='navbar'>
                    <li className='nav'>
                        <NavLink exact to="/">Home</NavLink>
                    </li>
                    <li className='nav'>
                        <NavLink exact to="/login">Login</NavLink>
                    </li>
                    <li className='nav'>
                        <NavLink exact to="/signup">Sign Up</NavLink>
                    </li>
                    <li className='nav'>
                        <NavLink exact to="/testbuild">Test Build a Deck!</NavLink>
                    </li>
                </ul>}

        </>
    )
}

export default NavBar