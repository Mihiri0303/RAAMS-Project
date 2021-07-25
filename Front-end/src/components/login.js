import React from 'react';
import imge from './../asset/login.jpg';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import {setUser,removeUser} from '../store/actions/userAction'


const SigninSchema = Yup.object().shape({
    Email: Yup.string().email()
      .required('Required'),
    Password: Yup.string()
      .required('Required')
  });


const Login = (props) => {
    const history = useHistory();
    const handleSubmit = async (values,actions) => {
        try {
            const user = await axios.post('/login',values,{
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                }
            });
            props.setUser(user.data);
            history.push('/');
        } catch (error) {
            actions.setStatus({"Error" : "Email or Password is incorrect !"})
            props.removeUser();
        }
    }
        return  (
            <>
             <section className='container'>
                <div className='row'>
                    <div className="col-md-4 offset-md-1 ">
                        <Formik
                            initialValues={{
                                Email: '',
                                Password: ''
                            }}
                            validationSchema={SigninSchema}
                            onSubmit={handleSubmit}>
                            {({ errors, touched,status,handleChange,setStatus }) => (
                                <Form className="d-flex flex-column gap-2 justify-content-center align-items-center needs-validation">
                                    <h4>Welcome</h4>
                                    <p>Log in to your account</p> 
                                    <div className="col-md-12 position-relative mb-2">
                                        <Field name="Email" type="text" onChange={(e) => {
                                            setStatus({})
                                            handleChange(e)
                                        }} className={`form-control shadow-sm border-0 py-2 ${errors.Email && touched.Email &&  "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Email" />
                                        {errors.Password && touched.Password && <div className="invalid-feedback">
                                            Please provide a valid Email.
                                        </div>}
                                    </div>
                                    <div className="col-md-12 position-relative mb-2">
                                        <Field name="Password" type="password" onChange={(e) => {
                                            setStatus({})
                                            handleChange(e)
                                        }} className={`form-control shadow-sm border-0 py-2 ${errors.Password && touched.Password && "is-invalid"}`} style={{fontSize:"0.8rem"}} placeholder="Password" />
                                        {errors.Password && touched.Password && <div className="invalid-feedback">
                                            Please provide a valid Password.
                                        </div>}
                                    </div>
                                    <div class={`text-danger`}>
                                        { status && status.Error ? status.Error : '' }
                                    </div>
                                    <div className="d-flex gap-2 justify-content-center align-items-center">
                                        <button type="submit" className="btn btn-sm px-4 py-2 btn-primary">Login</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="col-md-6 offset-md-1">
                        <img src={imge} alt="imag" style={{height : '100%',width : 400}}/>
                    </div>
                </div>
            </section>  
            </>
        )
}

export default connect(state => ({...state}),{setUser,removeUser})(Login)