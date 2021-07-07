import React from 'react';
import {Link} from 'react-router-dom';
import imge from './../asset/login.jpg';


const Login = () => {
        return  (
            <>
             <section className='container'>
                <div className='row'>
                    <div className="col-md-6 ">
                        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                        <h4>Welcome</h4>
                        <p>Log in to your account</p> 
                        </div>
                        <div className="row g-3 px-md-5 px-sm-3">
                            <input className={`form-control shadow-sm border-0 py-2"}`} style={{fontSize:"0.8rem"}} placeholder="User Name" />
                            <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="Password" />
                        <div className="d-flex gap-2 justify-content-center align-items-center">
                            <button className="btn btn-sm px-3 py-1 btn-primary">Login</button>
                        </div>
                         </div>
                    </div>
                    <div className="col-md-6">
                        <img src={imge} style={{height : '100%',width : 400}}/>
                    </div>
                   
                </div>
            </section>  
            </>
        )
}

export default Login