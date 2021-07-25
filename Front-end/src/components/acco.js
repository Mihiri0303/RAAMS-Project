import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';



const Accommodation = (props) => {
    const [accList,setAccList] = useState([]);

    useEffect(() => {
        getAcc();
    },[]) // eslint-disable-line

    const getAcc = async () => {
        try {
            const accs = await axios.get('/accommodation',{
                headers : {
                    'Accept' : 'application/json'
                }
            }); 
            setAccList(accs.data);
        } catch (error) {
            setAccList([]);
        }
    }

    const onReserve = async (acco_id) => {
        if(!window.confirm("Are you sure ?")) return false;
        try {
            const accs = await axios.put('/reserve',{
                Acc_id : acco_id,
                User_id : props.user._id
            },{
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                }
            }); 
            alert("Accomodation reserved!")
        } catch (error) {
            alert("Something went wrong !")
        }
    }

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
                        {accList.length !== 0 ? accList.map((acc,idx) => {
                            return (
                                <div className="card mb-2" key={idx}>
                                    <div className="card-body">
                                        <h5 className="card-title my-0">{acc.Title}<p className="badge bg-secondary ms-2 my-0">{acc.Mobile}</p></h5>
                                        <h6 className="card-subtitle mb-2 text-muted my-0 mt-1">{acc.Type}</h6>
                                        <p className="card-text my-0">{acc.Address}</p>
                                        <div className="float-end ml-auto ">
                                            <button className="btn btn-sm px-3 py-1 btn-outline-success mt-2" onClick={() => onReserve(acc._id)}>Reserve</button>
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
    )
}

export default connect(state => ({...state}))(Accommodation)