import React ,{ useState, useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl';

const Routr = () => {

    const mapContainer = useRef();
    const [lnglat, setLngLat] = useState([79.8998759,6.8278084]);
    const [zoom, setZoom] = useState(8);
    const [Locations,setLocations] = useState([]);
    const [map,setMap] = useState();
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
    },[]);
        return (
            <>
                <section className='container'>
                    <div className='row'>
                        <div className="col-md-4">
                            <div className="d-flex flex-column gap-2">
                                <h4>Plan your route</h4>
                                <div className="d-flex align-items-center">
                                    <p className="m-0">Round trip?</p>
                                        <div className="form-check form-switch d-flex align-items-center ps-3">
                                            <input className="form-check-input m-0" type="checkbox"/>
                                        </div>
                                </div>
                                <div className="d-flex align-items-center">
                                <p className="m-0">Allow to optimize the Route?</p>
                                        <div className="form-check form-switch d-flex align-items-center ps-3">
                                            <input className="form-check-input m-0" type="checkbox"/>
                                        </div>
                                </div>
                                <div className="d-flex align-items-center">
                                <p className="m-0">Show accommodations nearby?</p> 
                                        <div className="form-check form-switch d-flex align-items-center ps-3">
                                            <input className="form-check-input m-0" type="checkbox"/>
                                        </div>
                                </div>
                                <div className="shadow p-3 rounded me-5 mt-2">
                                    <h6 className="fw-bolder ">Location List</h6>
                                    <div className="overflow-auto "  style={{height:"110px"}}>
                                        <table className="table location-table table-borderless table-hover rounded m-0" id="locationTable" style={{fontSize:"0.8em"}}>
                                            <thead>
                                                <tr>
                                                    <th className="p-0" width="10%"></th>
                                                    <td className="p-0" width="80%"></td>
                                                    <td className="p-0" width="10%"></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="table-active">
                                                    <td colSpan="3">No Locations</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mt-2 gap-2">
                                <button className="btn btn-sm px-4 py-1 btn-primary ">Calculate</button>
                                <button className="btn btn-sm px-4 py-1 btn-outline-primary">Clear</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12 rounded-end" style={{height: "65vh"}} id="map" ref={mapContainer}/>
                    </div>
                </section>
            </>
        );
}

export default Routr