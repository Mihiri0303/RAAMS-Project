import React from 'react';
import imge from './../asset/login.jpg';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setUser,removeUser } from '../store/actions/userAction';


const SignUp = (props) => {

    let history = useHistory()

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
          .oneOf([Yup.ref('Password'), null],"Confirm Password doesn't match")
          .required('Required'),
        Verified : Yup.boolean()
        .oneOf([true],"You must agree with terms and conditions.")
        .required()
      });
    
    const handleSubmit = async (values,actions) => {
        const {Verified,Confirm,...SendValues} = values;
        try {
            const user = await axios.post('/signup',SendValues,{
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                }
            });
            props.setUser(user.data);
            history.push('/');
        } catch (error) {
            error.response.data.error.keyValue.Email && actions.setErrors({Email:"Email already exist!"})
            props.removeUser();
        }
    }
        return (
            <>
             <section className='container'>
                <div className='row'>
                    <div className="col-md-6 ">
                    <Formik 
                        initialValues={{
                            FirstName : '',
                            LastName : '',
                            UserRole : 0,
                            Mobile : '',
                            Email :'',
                            Password : '',
                            Confirm : '',
                            Verified: false
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={handleSubmit}>
                        {({errors,touched}) => (
                            <Form className="d-flex flex-column justify-content-center align-items-center">
                                <h4>Welcome</h4>
                                <p>Sign up to your account</p>                        
                                <div className="row gap-2 px-md-5 px-sm-3 w-75">
                                    <Field name="FirstName" type="text" className={`form-control shadow-sm border-0 py-2 ${errors.FirstName && touched.FirstName && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="First Name" />
                                    {errors.FirstName && touched.FirstName && <div className="invalid-feedback">
                                        {errors.FirstName}
                                    </div>}
                                    <Field name="LastName" type="text" className={`form-control shadow-sm border-0 py-2 ${errors.LastName && touched.LastName && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Last Name" />
                                    {errors.LastName && touched.LastName && <div className="invalid-feedback">
                                        {errors.LastName}
                                    </div>}
                                    <Field name="Mobile" className={`form-control shadow-sm border-0 py-2`} style={{fontSize:"0.8rem"}} placeholder="Mobile" />
                                    <Field name="UserRole" as="select" className={`form-select shadow-sm border-0 py-2 `} style={{fontSize:"0.8rem"}}>
                                        <option value={0}>Normal User</option>
                                        <option value={1}>Owner and User</option>
                                    </Field>
                                    <Field name="Email" className={`form-control shadow-sm border-0 py-2 ${errors.Email && touched.Email && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Email" />
                                    {errors.Email && touched.Email && <div className="invalid-feedback">
                                        {errors.Email}
                                    </div>}
                                    <Field name="Password" type="password" className={`form-control shadow-sm border-0 py-2 ${errors.Password && touched.Password && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Password" />
                                    {errors.Password && touched.Password && <div className="invalid-feedback">
                                        {errors.Password}
                                    </div>}
                                    <Field name="Confirm" type="password" className={`form-control shadow-sm border-0 py-2 ${errors.Confirm && touched.Confirm && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Confirm Password" />
                                    {errors.Confirm && touched.Confirm && <div className="invalid-feedback">
                                        {errors.Confirm}
                                    </div>}
                                    <div className="">
                                        <Field name="Verified" className={`form-check-input ${errors.Verified && touched.Verified && "is-invalid"}`} type="checkbox"></Field><span className="ps-2 " style={{fontSize:"0.8rem"}}>Agree with terms and conditions</span>
                                        {errors.Verified && touched.Verified && <div className="invalid-feedback">
                                        {errors.Verified}
                                        </div>}
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

export default connect(state => ({...state}),{setUser,removeUser})(SignUp)