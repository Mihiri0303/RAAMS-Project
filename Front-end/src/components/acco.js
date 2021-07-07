import React from 'react'

const Accommodation = () => {
        return (
            <>
                <section className='container'>
                    <div className='row'>
                        <div className="col-md-3 ">
                            <div className="d-flex flex-column gap-2">
                                <h4>Filter search</h4>
                                <div className="d-flex flex-column gap-2 ">
                                    <input className={`form-control shadow-sm border-0 py-2`} style={{fontSize:"0.8rem"}} placeholder="Search Text" />                      
                                    <div className="d-flex gap-2 ">    
                                        <input className={`form-control shadow-sm border-0 py-2`} type="Number" style={{fontSize:"0.8rem"}} placeholder="Min Amount" />                      
                                        <input className={`form-control shadow-sm border-0 py-2`} type="Number" style={{fontSize:"0.8rem"}} placeholder="Max Amount" /> 
                                    </div>
                                        <button className="btn btn-sm px-5 py-1 btn-primary mt-2">Search</button>
 
                                </div>
                            </div>
                        </div>
                        <div className=" col-md-9 ps-4">
                            {[1,2,3,4,5,6].map(() => {
                                return (
                                    <div className="card mb-2">
                                        <div className="card-body">
                                            <h5 className="card-title my-0">Hottel<p className="badge bg-secondary ms-2 my-0">022917278</p></h5>
                                            <h6 className="card-subtitle mb-2 text-muted my-0 mt-1">Appartment</h6>
                                            <p className="card-text my-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <div className="float-end ml-auto ">
                                                <button className="btn btn-sm px-3 py-1 btn-outline-success mt-2">Reserve</button>
                                            </div>
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

export default Accommodation