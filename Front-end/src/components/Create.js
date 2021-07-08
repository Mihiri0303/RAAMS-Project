import React from 'react';
import { Link } from 'react-router-dom';

const Create = () => {
        return (
            <>
            <section className='container'>
                <div className="h-75 row w-100 g-0  shadow-sm">
                    <div className="d-flex align-items-center">
                        <Link to="/ownrAcc" className="btn btn-sm btn-outline-success fw-bold ps-4 pe-4" >Back</Link>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                        <form className="col-12 p-4 rounded">
                            <h5 className="fw-bolder">Add Accommodation</h5>
                            <div className="col-md-12 my-3">
                                <input type="text" className={`form-control shadow-sm border-0 `}  style={{fontSize:"0.8rem"}} placeholder="Title *" />
                                <input type="text" hidden style={{fontSize:"0.8rem"}} />
                                <div className="invalid-feedback">Title is required.</div>
                            </div>
                            <div className="col-md-12 my-3">
                                <input type="text" className={`form-control shadow-sm border-0 `}  style={{fontSize:"0.8rem"}} placeholder="Type *" />
                                <div className="invalid-feedback">Type is required.</div>
                            </div>
                            <div className="col-md-12 my-3">
                                <input type="text" className={`form-control shadow-sm border-0 `}  style={{fontSize:"0.8rem"}} placeholder="Address *" />
                                <div className="invalid-feedback">Address is required.</div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <input type="text" className={`form-control shadow-sm border-0 `}  style={{fontSize:"0.8rem"}} placeholder="Latitude" />
                                    <div className="invalid-feedback">
                                        Enter valid Latitude.
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className={`form-control shadow-sm border-0 `}  style={{fontSize:"0.8rem"}} placeholder="Longitude"  />
                                    <div className="invalid-feedback">Enter valid Longitude.</div>
                                </div>
                            </div>
                            <div className="col-md-12 my-3">
                                <input type="number" className={`form-control shadow-sm border-0 `}  style={{fontSize:"0.8rem"}} placeholder="Amount Per Day *" />
                                <div className="invalid-feedback">Enter valid Amount.</div>
                            </div>
                            <button className="btn btn-sm btn-primary w-100"><b>Save</b></button>
                        </form>
                    </div>
                    {/* <div className="col-md-8 col-sm-12 rounded-end" style={{height: "65vh"}} id="Managemap" ref={mapContainer}/> */}
                </div>
            </section>
          </>
              
               
        )
}

export default Create