import React from 'react';
import imge from './../asset/login.jpg';

const SignUp = () => {
        return (
            <>
             <section className='container'>
                <div className='row'>
                    <div className="col-md-6 ">
                        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                        <h4>Welcome</h4>
                        <p>Sign up to your account</p>                        
                        </div>
                        <div className="row g-3 px-md-5 px-sm-3">
                        <div className="">
                            <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="First Name" />
                            <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="last Name" />
                            <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="Mobile" />
                            <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="" />
                                <button class="btn btn-outline dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                </ul>
                            
                            <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="E-mail" />
                            <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="Password" />
                            <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="Confirm Password" />
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

export default SignUp