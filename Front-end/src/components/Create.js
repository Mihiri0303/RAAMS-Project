import React ,{ useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation,useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const CreateSchema = Yup.object().shape({
    Title : Yup.string().required(),
    Type : Yup.string().required(),
    Address : Yup.string().required(),
    Latitude : Yup.number().required(),
    Longitude : Yup.number().required(),
    Amount : Yup.number().required(),
});

const Create = (props) => {

    const mapContainer = useRef();
    const [lnglat, setLngLat] = useState([79.8998759,6.8278084]); // eslint-disable-line
    const [zoom, setZoom] = useState(8); // eslint-disable-line
    const [Locations,setLocations] = useState([]); // eslint-disable-line
    const [map,setMap] = useState(); // eslint-disable-line
    const [marker,setMarker] = useState();
    const [accId,setAccId] = useState();
    const params = new URLSearchParams(useLocation().search);
    const [initialValues,setInitialValues]=useState({
        Title: '',
        Type : '',
        Address : '',
        Latitude : '',
        Longitude :'',
      Amount : '',
    });
    mapboxgl.accessToken = 'pk.eyJ1IjoibWloaXIzOTA5MyIsImEiOiJja3JsbTI3NWIxYjZyMnVtbDY4c3l2YTI1In0.JrooBRfiaudzvBh3Npz1ZQ';

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        setAccId((params.get('q') !== null ? params.get('q') : ''));
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: lnglat,
            zoom: zoom
        });
        var nav = new mapboxgl.NavigationControl({
            visualizePitch : false,
        });
        var scale = new mapboxgl.ScaleControl({
            maxWidth: 150,
            unit: 'metrics'
        });
        var Geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
        map.addControl(nav, 'top-left');
        map.addControl(scale);
        map.addControl(Geolocate);
        setMarker(new mapboxgl.Marker({
            color : `hsl(${Math.random() * 360},50%,50%)`,
            scale : 0.7,
            draggable : true
        }));

        setMap(map);
        return () => map.remove();
    },[]); // eslint-disable-line

    useEffect(() => {
        if(map !== undefined){
            marker.on('dragend', e =>{
                setLngLat(marker.getLngLat())
            })
            map.on('click', function(e){
                setLngLat(e.lngLat);
                marker.setLngLat(e.lngLat)
                .addTo(map);
            });
        }
    },[marker]);// eslint-disable-line

    useEffect(() => {
        if(map !== undefined){
            map.flyTo({
                center : lnglat
            });
            setInitialValues(obj => ({
                ...obj,
                Latitude : lnglat.lat,
                Longitude :lnglat.lng,
            }));
            // setValue('Latitude',lnglat.lat);
            // setValue('Longitude',lnglat.lng);
        }
    },[lnglat]);// eslint-disable-line

    const handleSubmit = async (values) => {
        try {
            const postData = {...values,Owner_id : props.user._id, Mobile : props.user.Mobile};
            let method = 'put';
            let params = {}
            if(accId) {
                method = 'patch';
                params = {
                    id: accId
                };
            }
            await axios({
                method : method,
                url : '/accommodation',
                params: params,
                data : postData,
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                }
            });
            reset();
            let { from } = location.state || { from: { pathname: "/ownrAcc" } };
            accId && alert("Update successed!")
            !accId && alert("Insert successed!")
            history.replace(from);
        } catch (error) {
            alert("something went wrong recheck form and submit again !")
        }
    } 

    useEffect(()=>{
        if(accId){
            setForm();
        }
    },[accId]);// eslint-disable-line
    

    const setForm = async () => {
        if(accId){
            const acc = await axios.get('/accommodation/'+accId,{
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                }
            });
            setInitialValues({
                Title: acc.data.Title,
                Type : acc.data.Type,
                Address : acc.data.Address,
                Latitude : acc.data.Latitude,
                Longitude :acc.data.Longitude,
                Amount : acc.data.Amount,
            });     
            marker.setLngLat({lng:acc.data.Longitude,lat:acc.data.Latitude})
            .addTo(map);
            setLngLat({lng:acc.data.Longitude,lat:acc.data.Latitude});           
        }
    }

    const reset = () => {
        setInitialValues({
            Title: '',
            Type : '',
            Address : '',
            Latitude : '',
            Longitude :'',
            Amount : '',
        });
    }

        return (
            <>
            <section className='container'>
                <div className="h-75 row w-100 g-0  shadow-sm">
                    <div className="d-flex align-items-center">
                        <Link to="/ownrAcc" className="btn btn-sm btn-outline-success fw-bold ps-4 pe-4" >Back</Link>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                    <Formik 
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={CreateSchema}
                        onSubmit={handleSubmit}>
                        {({errors,touched,handleChange}) => (

                        <Form className="col-12 p-4 rounded">
                            <h5 className="fw-bolder">Add Accommodation</h5>
                            <div className="col-md-12 my-3">
                                <Field name="Title" type="text" onChange={(e) =>{handleChange(e); setInitialValues(obj => ({...obj,Title : e.target.value}))}} className={`form-control shadow-sm border-0 ${errors.Title && touched.Title && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Title *" />
                                <input type="text" name="id" hidden style={{fontSize:"0.8rem"}} />
                                <div className="invalid-feedback">Title is required.</div>
                            </div>
                            <div className="col-md-12 my-3">
                                <Field name="Type" type="text" onChange={(e) =>{handleChange(e); setInitialValues(obj => ({...obj,Type : e.target.value}))}} className={`form-control shadow-sm border-0 ${errors.Type && touched.Type && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Type *" />
                                <div className="invalid-feedback">Type is required.</div>
                            </div>
                            <div className="col-md-12 my-3">
                                <Field name="Address" type="text" onChange={(e) =>{handleChange(e); setInitialValues(obj => ({...obj,Address : e.target.value}))}} className={`form-control shadow-sm border-0 ${errors.Address && touched.Address && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Address *" />
                                <div className="invalid-feedback">Address is required.</div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <Field name="Latitude" type="text" onChange={(e) =>{handleChange(e); setInitialValues(obj => ({...obj,Latitude : e.target.value}))}} className={`form-control shadow-sm border-0 ${errors.Latitude && touched.Latitude && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Latitude" />
                                    <div className="invalid-feedback">
                                        Enter valid Latitude.
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <Field name="Longitude" type="text" onChange={(e) =>{handleChange(e); setInitialValues(obj => ({...obj,Longitude : e.target.value}))}} className={`form-control shadow-sm border-0 ${errors.Longitude && touched.Longitude && "is-invalid"} `}  style={{fontSize:"0.8rem"}} placeholder="Longitude"  />
                                    <div className="invalid-feedback">Enter valid Longitude.</div>
                                </div>
                            </div>
                            <div className="col-md-12 my-3">
                                <Field name="Amount" type="number" onChange={(e) =>{handleChange(e); setInitialValues(obj => ({...obj,Amount : e.target.value}))}} className={`form-control shadow-sm border-0 ${errors.Amount && touched.Amount && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Amount Per Day *" />
                                <div className="invalid-feedback">Enter valid Amount.</div>
                            </div>
                            <button className="btn btn-sm btn-primary w-100"><b>Save</b></button>
                        </Form>
                    )}</Formik>
                    </div>
                    <div className="col-md-8 col-sm-12 rounded-end" style={{height: "65vh"}} id="Managemap" ref={mapContainer}/>
                </div>
            </section>
          </>
        )
}

export default connect(state => ({...state}))(Create)