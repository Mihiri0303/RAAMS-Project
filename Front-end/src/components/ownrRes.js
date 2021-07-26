import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

const Res = (props) => {
    const [accList,setAccList] = useState([]);

    useEffect(() => {
        getAcc();
    },[]) // eslint-disable-line

    const getAcc = async () => {
        try {
            const accs = await axios.get(`/reserve?Owner_id=${props.user._id}`,{
                headers : {
                'Accept' : 'application/json'
                }
            }); 
            setAccList(accs.data);
        } catch (error) {
            setAccList([]);
        }
    }
    return (
        <>
            <section className="container">
                <div className="d-flex align-items-center">
                    <Link
                        to="/dashbord"
                        className="btn btn-sm btn-outline-success fw-bold ps-4 pe-4"
                    >
                        Back
                    </Link>
                </div>
                <div className="h-75 row w-100">
                    <div
                        className="col-sm-12 my-3"
                        style={{ overflowY: "auto", height: "65vh" }}
                    >
                        {accList.length !== 0 ? accList.map((acc,idx) => {
                            return (
                                <div className="card mb-2" key={idx}>
                                    <div className="card-body">
                                        <h5 className="card-title my-0">{acc.Acc_id.Title}<p className="badge bg-secondary ms-2 my-0">{acc.Acc_id.Mobile}</p></h5>
                                        <h6 className="card-subtitle mb-2 text-muted my-0 mt-1">{acc.Acc_id.Type}</h6>
                                        <p className="card-text my-0 text-primary fw-bold">{acc.User_id.Mobile +" - "+acc.User_id.FirstName}</p>
                                        <p className="card-text my-0">Reserved Date : {new Date(acc.ReserveDate).toLocaleString()}</p>
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

export default connect(state => ({...state}))(Res);
