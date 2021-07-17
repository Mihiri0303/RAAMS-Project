import React from 'react';
import {Link} from 'react-router-dom';
import imge from './../asset/login.jpg';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const SigninSchema = Yup.object().shape({
    UserName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    Password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
  });


const Login = () => {
        return  (
            <>
             <section className='container'>
                <div className='row'>
                    <div className="col-md-4 offset-md-1 ">
                        <Formik
                            initialValues={{
                                UserName: '',
                                Password: ''
                            }}
                            validationSchema={SigninSchema}
                            onSubmit={values => {
                                console.log(values);
                            }}>
                            {({ errors, touched }) => (
                                <Form className="d-flex flex-column gap-2 justify-content-center align-items-center needs-validation">
                                    <h4>Welcome</h4>
                                    <p>Log in to your account</p> 
                                    <div className="col-md-12 position-relative mb-2">
                                        <Field name="UserName" type="text" className={`form-control shadow-sm border-0 py-2 ${errors.UserName && touched.UserName &&  "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="User Name" />
                                        <div className="invalid-feedback">
                                            Please provide a valid Username.
                                        </div>
                                    </div>
                                    <div className="col-md-12 position-relative mb-2">
                                        <Field name="Password" type="password" className={`form-control shadow-sm border-0 py-2 ${errors.Password && touched.Password && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Password" />
                                        <div className="invalid-feedback">
                                            Please provide a valid Password.
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 justify-content-center align-items-center">
                                        <button type="submit" className="btn btn-sm px-4 py-2 btn-primary">Login</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="col-md-6 offset-md-1">
                        <img src={imge} style={{height : '100%',width : 400}}/>
                    </div>
                </div>
            </section>  
            </>
        )
}

export default Login