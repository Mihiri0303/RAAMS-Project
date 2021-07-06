import React from 'react';
import {Link} from 'react-router-dom';
import imge from './../asset/login.jpg';


const Login = () => {
        return  (
            <>
             <section className='container'>
                <div className='row'>
                    <div className="col-md-6 ">
                        <div className="d-flex justify-content-center align-items-center">
                        <h4>Welcome</h4>
                        
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