import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { connect } from 'react-redux';

const Owner = (props) => {
    const [accList,setAccList] = useState([]);

    useEffect(() => {
        getAcc();
    },[]) // eslint-disable-line

    const getAcc = async () => {
        try {
            const accs = await axios.get('/accommodation?owner='+props.user._id,{
                headers : {
                    'Accept' : 'application/json'
                }
            }); 
            setAccList(accs.data);
        } catch (error) {
            setAccList([]);
        }
    }

    const handleDelete = async (id) => {
        if(!window.confirm('Are you sure ?')) return false;
        try {
            await axios.delete('/accommodation/'+id,{
                headers : {
                    'Accept' : 'application/json'
                }
            }); 
            getAcc();
        } catch (error) {
            alert('somthing went wrong !');
        }
    }

    return (
        <>
            <section className="container">
                <div className="h-75 row">
                    <div className="col-md-12 py-4">
                        <div className="d-flex align-items-center gap-3">
                            <Link
                                to="/dashbord"
                                className="btn btn-sm btn-outline-success fw-bold ps-4 pe-4">
                                Back
                            </Link>
                            <Link
                                to="/ownrAcc/create"
                                className="btn btn-sm btn-primary">
                                Create New
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-12 ">
                    {accList.length !== 0 ? accList.map((acc,idx) => {
                            return (
                                <div className="card mb-2" key={idx}>
                                    <div className="card-body">
                                        <h5 className="card-title my-0">{acc.Title}<p className="badge bg-secondary ms-2 my-0">{acc.Mobile}</p></h5>
                                        <h6 className="card-subtitle mb-2 text-muted my-0 mt-1">{acc.Type}</h6>
                                        <p className="card-text my-0">{acc.Address}</p>
                                        <p className="card-text my-0">{acc.Amount.toFixed(2)}</p>
                                        <div className="float-end ml-auto ">
                                            <Link className="btn btn-sm px-3 py-1 btn-outline-warning mt-2 me-2" to={`ownrAcc/create?q=${acc._id}`}>Edit</Link>
                                            <button className="btn btn-sm px-3 py-1 btn-outline-danger mt-2" onClick={() => handleDelete(acc._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="col-12 row bg-light rounded shadow-sm mb-3 m-0 position-relative">
                            <div className="p-3 " style={{width: "100%"}}>
                                <div className="w-100 rounded position-relative">
                                    <h6 >No Accommodation Found</h6>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default connect(state => ({...state}))(Owner)