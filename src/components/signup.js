import React from 'react';
import imge from './../asset/login.jpg';

const SignUp = () => {
        return (
            <>
             <section className='container'>
                <div className='row'>
                    <div className="col-md-6 ">
                        <div className="d-flex justify-content-center align-items-center">
                        <h4>Welcome</h4>
                        <p className="text-sec-2 text-center lh-lg mt-2 mb-2">Sign up to your account</p>                        
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