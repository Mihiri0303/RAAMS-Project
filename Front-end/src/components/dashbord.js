import React from 'react';
import { Link } from 'react-router-dom';


const Dash = () => {
        return (
            <>
                <section className='container'>
                    <div className="Section-main position-relative pt-3 d-flex justify-content-center align-items-center px-xs-2 px-md-5 ">
                        <div className="h-75 row w-100">
                            <div className="row gap-3">
                                <Link to="/ownrAcc" className="text-decoration-none col-md-3 bold py-5 btn btn-success rounded-3">Manage Accommodation</Link>
                                <Link to="/ownrRes" className="text-decoration-none col-md-3 bold py-5 btn btn-info rounded-3">Reservations</Link>
                                {/* <Link to="/ownrRep" className="text-decoration-none col-md-3 bold py-5  btn btn-warning rounded-3">Report</Link> */}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
}

export default Dash