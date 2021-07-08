import React from 'react';
import { Link } from 'react-router-dom';

const Owner = () => {
        return (
             <>
                <section className='container'>
                    <div className="h-75 row">
                        <div className="col-md-12 py-4">
                                <div className="d-flex align-items-center gap-3">
                                        <Link to="/dashbord" className="btn btn-sm btn-outline-success fw-bold ps-4 pe-4" >Back</Link>
                                        <Link to="/ownrAcc/create" className="btn btn-sm btn-primary" >Create New</Link>
                                </div>
                        </div>
                        <div className="col-md-12 ">
                                {[1].map(() => {
                                        return (
                                        <div className="card mb-2">
                                                <div className="card-body">
                                                <h5 className="card-title my-0">Hottel<p className="badge bg-secondary ms-2 my-0">022917278</p></h5>
                                                <h6 className="card-subtitle mb-2 text-muted my-0 mt-1">Appartment</h6>
                                                <p className="card-text my-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                </div>
                                        </div>
                                        )
                                })}
                        </div>
                    </div>
                </section>
             </>
        )
}

export default Owner