import React from 'react';
import imge from './../asset/login.jpg';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    
    FirstName : Yup.string().required(),
    LastName : Yup.string().required(),
    Mobile: Yup.number()
      .min(10),
    Email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    Password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    Confirm: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
  });

const SignUp = () => {
        return (
            <>
             <section className='container'>
                <div className='row'>
                    <div className="col-md-6 ">
                    <Formik 
                        initialValues={{
                            UserName: '',
                            FirstName : '',
                            LastName : '',
                            Mobile : '',
                            Email :'',
                            Password : '',
                            Confirm : '',
                            verified: false
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            console.log(values);
                        }}>
                        {({errors,touched}) => (
                            <Form className="d-flex flex-column justify-content-center align-items-center">
                                <h4>Welcome</h4>
                                <p>Sign up to your account</p>                        
                                <div className="row gap-2 px-md-5 px-sm-3 w-75">
                                    <Field name="FirstName" type="text" className={`form-control shadow-sm border-0 py-2 ${errors.FirstName && touched.FirstName && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="First Name" />
                                    <div className="invalid-feedback">
                                        Please provide a valid First Name.
                                    </div>
                                    <Field name="LastName" type="text" className={`form-control shadow-sm border-0 py-2 ${errors.LastName && touched.LastName && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Last Name" />
                                    <div className="invalid-feedback">
                                        Please provide a valid Last Name.
                                    </div>
                                    <Field name="Mobile" className={`form-control shadow-sm border-0 py-2`} style={{fontSize:"0.8rem"}} placeholder="Mobile" />
                                    <Field as="select" className={`form-select shadow-sm border-0 py-2 `} defaultValue={0} style={{fontSize:"0.8rem"}}>
                                        <option value="0">Normal User</option>
                                        <option value="0">Owner and User</option>
                                    </Field>
                                    <Field name="Email" className={`form-control shadow-sm border-0 py-2 ${errors.Email && touched.Email && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Email" />
                                    <div className="invalid-feedback">
                                        Please provide a valid E-mail.
                                    </div>
                                    <Field name="Password" type="password" className={`form-control shadow-sm border-0 py-2 ${errors.Password && touched.Password && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Password" />
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                    <Field name="Confirm" type="password" className={`form-control shadow-sm border-0 py-2 ${errors.Confirm && touched.Confirm && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Confirm Password" />
                                    <div className="invalid-feedback">
                                        Please confirm your Password.
                                    </div>
                                    <div className="">
                                        <Field name="verified" className={`form-check-input`} type="checkbox"></Field><span className="ps-2 " style={{fontSize:"0.8rem"}}>Agree with terms and conditions</span>
                                    </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button className="btn btn-sm px-5 py-2 btn-primary">Sign Up</button>
                                </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    </div>
                    <div className="col-md-6">
                        <img src={imge} alt="imag" style={{height : '100%',width : 400}}/>
                    </div>
                </div>
            </section>  
            </>
           
        )
}

export default SignUp