import React from 'react';
import {Link} from 'react-router-dom'
import { FaMapMarkedAlt } from "react-icons/fa";


const Header = () => {
        return (
            <>
                <header className='container d-flex justify-content-between align-items-center' style={{height: '8rem'}}>
                    <Link className="h3 text-decoration-none text-primary " to="/"> <FaMapMarkedAlt style={{fontSize:"2rem"}}/> Route & Accommodation</Link>
                    <div className='d-flex gap-3'>
                        <Link className="h6 text-decoration-none " to='/'>Home</Link>
                        <Link className="h6 text-decoration-none " to='/routr'>Router</Link>
                        <Link className="h6 text-decoration-none " to='/acco'>Accommodation</Link>
                        <Link className="h6 text-decoration-none " to='/myList'>My List</Link>
                    </div>
                    <div className='d-flex gap-2'>
                        <Link className="links" to='/login' className="btn btn-sm px-3 py-1 btn-outline-primary">Login</Link>
                        <Link className="links" to='/signup' className="btn btn-sm px-3 py-1 btn-primary">Sign Up</Link>
                    </div>
                </header>
            </>
        )
}

export default Header