import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const My = (props) => {
    const [accList,setAccList] = useState([]);

    useEffect(() => {
        getAcc();
    },[]) // eslint-disable-line

    const getAcc = async () => {
        try {
            const accs = await axios.get(`/reserve?User_id=${props.user._id}`,{
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
            <section className='container'>
                <div className='row'>
                    <div className=" col-md-12 ps-5 pe-5">
                    {accList.length !== 0 ? accList.map((acc,idx) => {
                            return (
                                <div className="card mb-2" key={idx}>
                                    <div className="card-body">
                                        <h5 className="card-title my-0">{acc.Acc_id.Title}<p className="badge bg-secondary ms-2 my-0">{acc.Acc_id.Mobile}</p></h5>
                                        <h6 className="card-subtitle mb-2 text-muted my-0 mt-1">{acc.Acc_id.Type}</h6>
                                        <p className="card-text my-0">{acc.Acc_id.Address}</p>
                                        <p className="card-text my-0">{acc.Acc_id.Amount.toFixed(2)}</p>
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
    )
}

export default connect(state => ({...state}))(My)