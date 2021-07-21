import React ,{ useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const CreateSchema = Yup.object().shape({
    Tittle : Yup.string().required(),
    Type : Yup.string().required(),
    Address : Yup.string().required(),
    Latitude : Yup.string().required(),
    Longitude : Yup.string().required(),
    Amount_Perday : Yup.number().required(),
});

const Create = () => {

    const mapContainer = useRef();
    const [lnglat, setLngLat] = useState([79.8998759,6.8278084]); // eslint-disable-line
    const [zoom, setZoom] = useState(8); // eslint-disable-line
    const [Locations,setLocations] = useState([]); // eslint-disable-line
    const [map,setMap] = useState(); // eslint-disable-line
    mapboxgl.accessToken = 'pk.eyJ1IjoibGFzaXRoODc5IiwiYSI6ImNrbjV2eW1tcTA4N2IycnM0eDY4c2xuZ3QifQ.1b2qEsuBFBVNg682HGe7hw';

    useEffect(() => {
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
        
        setMap(map);
        return () => map.remove();
    },[]); // eslint-disable-line
        return (
            <>
            <section className='container'>
                <div className="h-75 row w-100 g-0  shadow-sm">
                    <div className="d-flex align-items-center">
                        <Link to="/ownrAcc" className="btn btn-sm btn-outline-success fw-bold ps-4 pe-4" >Back</Link>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                    <Formik 
                        initialValues={{
                            Tittle: '',
                            Type : '',
                            Address : '',
                            Latitude : '',
                            Longitude :'',
                          Amount_Perday : '',
                        }}
                        validationSchema={CreateSchema}
                        onSubmit={values => {
                            console.log(values);
                        }}>
                        {({errors,touched}) => (

                        <Form className="col-12 p-4 rounded">
                            <h5 className="fw-bolder">Add Accommodation</h5>
                            <div className="col-md-12 my-3">
                                <Field name="TIttle" type="text" className={`form-control shadow-sm border-0 ${errors.Tittle && touched.Tittle && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Title *" />
                                <input type="text" hidden style={{fontSize:"0.8rem"}} />
                                <div className="invalid-feedback">Title is required.</div>
                            </div>
                            <div className="col-md-12 my-3">
                                <Field name="Type" type="text" className={`form-control shadow-sm border-0 ${errors.Type && touched.Type && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Type *" />
                                <div className="invalid-feedback">Type is required.</div>
                            </div>
                            <div className="col-md-12 my-3">
                                <Field name="Address" type="text" className={`form-control shadow-sm border-0 ${errors.Address && touched.Address && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Address *" />
                                <div className="invalid-feedback">Address is required.</div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <Field name="latitude" type="text" className={`form-control shadow-sm border-0 ${errors.Latitude && touched.Latitude && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Latitude" />
                                    <div className="invalid-feedback">
                                        Enter valid Latitude.
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <Field name="Longitude" type="text" className={`form-control shadow-sm border-0 ${errors.Longitude && touched.Longitude && "is-invalid"} `}  style={{fontSize:"0.8rem"}} placeholder="Longitude"  />
                                    <div className="invalid-feedback">Enter valid Longitude.</div>
                                </div>
                            </div>
                            <div className="col-md-12 my-3">
                                <Field name="Amount_Perday" type="number" className={`form-control shadow-sm border-0 ${errors.Amount_Perday && touched.Amount_Perday && "is-invalid"}`}  style={{fontSize:"0.8rem"}} placeholder="Amount Per Day *" />
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

export default Create