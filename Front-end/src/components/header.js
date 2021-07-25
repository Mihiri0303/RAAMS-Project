import React from 'react';
import {Link,useLocation} from 'react-router-dom'
import {connect} from 'react-redux';
import { FaMapMarkedAlt } from "react-icons/fa";
import { removeUser } from '../store/actions/userAction';
import { useHistory } from 'react-router-dom';


const Header = (props) => {
    const history = useHistory();
    const logOutUser = () => {
        props.removeUser();
        history.push('/');
    }
    let match = useLocation();
        return (
            <>
                <nav className="navbar sticky-top navbar-expand-md navbar-light container bg-white" style={{height: '8rem'}}>
                    <Link className="h4 text-decoration-none text-primary " to="/"> <FaMapMarkedAlt style={{fontSize:"2rem"}}/> Route & Accommodation</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className={`nav-item ms-md-1 ${match.pathname === '/' ? 'active fw-bold' : ''}`}>
                                <Link className="nav-link text-primary " to="/">Home</Link>
                            </li>
                            {props.user && Object.keys(props.user).length !== 0 && props.user.UserRole === 1 &&
                                <li className={`nav-item ms-md-1 ${match.pathname === '/dashbord' ? 'active fw-bold' : ''}`}>
                                    <Link className="nav-link text-primary " to="/dashbord">Dashboard</Link>
                                </li>
                            }
                            <li className={`nav-item ms-md-1 ${match.pathname === '/routr' ? 'active fw-bold' : ''}`}>
                                <Link className="nav-link text-primary " to="/routr">Router</Link>
                            </li>
                            <li className={`nav-item ms-md-1 ${match.pathname === '/acco' ? 'active fw-bold' : ''}`}>
                                <Link className="nav-link text-primary " to="/acco">Accommodation</Link>
                            </li>
                            {props.user && Object.keys(props.user).length !== 0 &&
                                <li className={`nav-item ms-md-1 ${match.pathname === '/myList' ? 'active fw-bold' : ''}`}>
                                    <Link className="nav-link text-primary " to="/myList">My List</Link>
                                </li>
                            }
                            {/* <li className={`nav-item ms-md-1 ${match.pathname === '/accommodation' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/accommodation">My Accommodation</Link>
                            </li> */}
                        </ul>
                            {props.user && Object.keys(props.user).length === 0 ?
                                <div>
                                    <Link className={`btn btn-sm px-3 py-1 btn-outline-primary me-2 ${match.pathname === '/signup' ? 'me-md-5' : ''}`} hidden={match.pathname === '/login'}  to="/login"><b>Login</b></Link>
                                    <Link className="btn btn-sm px-3 py-1 btn-primary " hidden={match.pathname === '/signup'}  to="/signup">Sign Up</Link>
                                </div> : 
                                <div>
                                    <span className={`my-2 mx-md-2 me-2n p-3`}>{props.user.FirstName}</span>
                                    <button className="btn btn-sm px-3 py-1 btn-primary my-2 fw-bold" onClick={logOutUser}>Log Out</button>
                                </div>
                            }
                        
                    </div>
                </nav>
            </>
        )
}

const stateToProps = state => ({
    ...state
})

export default connect(stateToProps,{removeUser})(Header);