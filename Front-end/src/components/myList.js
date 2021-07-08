import React from 'react'

const My = () => {
        return (
             <>
                <section className='container'>
                        <div className='row'>
                        <div className=" col-md-12 ps-5 pe-5">
                                {[1,2,3,4,5,6].map(() => {
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

export default My