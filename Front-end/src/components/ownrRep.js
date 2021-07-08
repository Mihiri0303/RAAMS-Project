import React from 'react';
import { Link } from 'react-router-dom';

const Report = () => {
        return (
            <>
            <section className='container'>
              <div className="row w-100 mb-5">
                  <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold">Accommodation reservation Report</h5>
                    <div className="d-flex align-items-center gap-2">
                        <Link to="/dashbord" className="btn btn-sm btn-outline-success fw-bold ps-4 pe-4" >Back</Link>
                        <button className="btn btn-sm btn-warning fw-bold" >Generate PDF</button>
                    </div>
                  </div>
                  <div className="row mt-1">
                      <div className="col-md-4">
                          <div className="col-md-12">From : </div>
                          <input type='date' className={`form-control`} />
                      </div>
                      <div className="col-md-4">
                          <div className="col-md-12">To : </div>
                          <input type='date' className={`form-control`} />
                      </div>
                      {/* <button className="col-md-1 btn btn-sm btn-info fw-bold" onClick={getDataset}>Refresh</button> */}
                  </div>
                  <div className="col-sm-12 my-3 table-responsive" style={{overflowY: "auto",height: "70vh"}}>
                      <table className="table align-middle table-light table-hover">
                          <thead className="position-sticky top-0">
                              <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Accommodation</th>
                                  <th scope="col">Reserved Date</th>
                                  <th scope="col">Reserver Name</th>
                                  <th scope="col">Amount</th>
                              </tr>
                          </thead>
                          <tbody>
                              {/* {dataList && dataList.length !== 0?
                                  dataList.map((data,index) => {
                                      return (
                                          <tr key={index}>
                                              <td>{index+1}</td>
                                              <td>{data.Title}</td>
                                              <td>{data.reserved.ReserveDate}</td>
                                              <td>{data.ReserverName}</td>
                                              <td className="text-end">{data.Amount.toFixed(2)}</td>
                                          </tr>
                                      );
                                  }) : 
                                  <tr>
                                      <td colSpan="5" className="text-center">No Data Found</td>
                                  </tr>
                              } */}
                          </tbody>
                      </table>
                      {/* <div className="d-flex justify-content-between align-items-center">
                          <p className="fw-bold">Total Reservers : <span className="fw-normal">{totalReservers}</span></p>
                          <p className="fw-bold">Total Reservations : <span className="fw-normal">{totalReservations}</span></p>
                          <p className="fw-bold">Total Amount : <span className="fw-normal">{totalAmount.toFixed(2)}</span></p>
                      </div> */}
                  </div>
              </div>
            </section>
          </>
              
               
        )
}

export default Report