import React from 'react';
import imge from './../asset/login.jpg';

const SignUp = () => {
        return (
            <>
             <section className='container'>
                <div className='row'>
                    <div className="col-md-6 ">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h4>Welcome</h4>
                            <p>Sign up to your account</p>                        
                            <div className="row gap-2 px-md-5 px-sm-3 w-75">
                                <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="First Name" />
                                <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="last Name" />
                                <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="Mobile" />
                                <select className={`form-select shadow-sm border-0 py-2 `} defaultValue={0} style={{fontSize:"0.8rem"}}>
                                    <option value="0">Normal User</option>
                                    <option value="0">Owner and User</option>
                                </select>
                                <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="E-mail" />
                                <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="Password" />
                                <input className={`form-control shadow-sm border-0 py-2 "}`} style={{fontSize:"0.8rem"}} placeholder="Confirm Password" />
                            <div className="">
                                <input className={`form-check-input`} type="checkbox"></input><span className="ps-2 " style={{fontSize:"0.8rem"}}>Agree with terms and conditions</span>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <button className="btn btn-sm px-5 py-2 btn-primary">Sign Up</button>
                            </div>
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