import React from 'react';
import { Link } from 'react-router-dom';

const Res = () => {
        return (
             <>
                <section className='container'>
                    <div className="d-flex align-items-center">
                        <Link to="/dashbord" className="btn btn-sm btn-outline-success fw-bold ps-4 pe-4" >Back</Link>
                    </div>
                    <div className="h-75 row w-100">
                            <div className="col-sm-12 my-3" style={{overflowY: "auto",height: "65vh"}}>
                                {/* {AccomodationList && AccomodationList.length !== 0?
                                    AccomodationList.map((data,index) => {
                                        return <AccomodationWidget key={index} nochilds={true} cancel={true} dataObject={data}/>
                                    }) :  */}
                                    <div className="col-12 row bg-light rounded shadow-sm mb-3 m-0 position-relative">
                                        <div className="p-3 " style={{width: "100%"}}>
                                            <div className="w-100 rounded position-relative">
                                                <h6 >No Reserved Accommodation Found</h6>
                                            </div>
                                        </div>
                                    </div>
                                {/* } */}
                            </div>
                    </div>
                </section>
             </>
        )
}

export default Res