import React ,{ useState, useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl';
import Route from '../script/Route';
import { FaTrash } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';

const Routr = () => {

    const mapContainer = useRef();
    const [lnglat, setLngLat] = useState([79.8998759,6.8278084]);
    const [zoom, setZoom] = useState(8);
    const [Locations,setLocations] = useState([]);
    const [map,setMap] = useState();
    mapboxgl.accessToken = 'pk.eyJ1IjoibGFzaXRoODc5IiwiYSI6ImNrbjV2eW1tcTA4N2IycnM0eDY4c2xuZ3QifQ.1b2qEsuBFBVNg682HGe7hw';
    const [route,setRoute] = useState(new Route(mapboxgl));
    const [accId,setAccId] = useState('');
    const [accoMarkers,setAccoMarkers] = useState([]);
    const [roundTrip,setRoundTrip] = useState(false);
    const [reOrder,setReOrder] = useState(true);
    const [showAcco,setShowAcco] = useState(false);

    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(useLocation().search);

    useEffect(() => {
        setAccId((params.get('reserve') !== null ? params.get('reserve') : ''));
        setLocations([]);
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
        map.on('click', function(e){
            const { target } = e.originalEvent;
            const canvas = map.getCanvas();
            const shouldClosePopup = target === canvas;
            if(shouldClosePopup){                
                const trs = document.querySelectorAll('#locationTable tbody tr');
                if(trs.length >= 10){
                    alert('Location limit exceeded !')
                    return false;
                }
                setLngLat(e.lngLat);
                route.getGeoLocation(e.lngLat.lng,e.lngLat.lat)
                .then(data => {
                    if(data.length > 0){
                        const marker = new mapboxgl.Marker({
                                color : `hsl(${Math.random() * 360},50%,50%)`,
                                scale : 0.7
                            }).setLngLat(e.lngLat)
                            .addTo(map);
                        data[0].marker = marker;
                        data[0].lngLat = Object.values(e.lngLat);
                        setLocations(OldLocations => [...OldLocations, data[0]]);
                    }
                })
                .catch(error => console.log(error));
            }
        });
        setMap(map);
        return () => map.remove();
    },[]);

    const DeleteLocation =(e) => {
        const data = Locations.splice(e,1);
        if(data !== []){
            data[0].marker.remove();
        }
        setLocations([...Locations]);
    }
    
    const calculateRoute = () => {
        if(Locations.length > 0){
            const options = {
                roundtrip: !roundTrip,
                source : 'first',
                destination : 'last'
            }
            route.getRoute(Locations,options,reOrder)
            .then(response => {
                setLngLat(Locations[0].lngLat);
                const route = response.coordinates;
                var geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'LineString',
                      coordinates: route
                    }
                  };
                if (map.getSource('route')) {
                    map.getSource('route').setData(geojson);
                } else { // otherwise, make a new request
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: route
                                }
                            }
                        },
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#120e43',
                            'line-width': 3,
                            'line-opacity': 0.75
                        }
                    });
                }
            })
            .catch(error => console.log(error));
        }
    }

    const clearRoute = () => {
        Locations.forEach(item => {
            item.marker.remove();
        });
        setLocations([]);
        if (map.getLayer('route')) map.removeLayer('route');
        if (map.getSource('route')) map.removeSource('route');
        if(accoMarkers.length !== 0) accoMarkers.forEach(marker => marker.remove());
        setAccoMarkers([]);
    }

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
                                            <input className="form-check-input m-0" type="checkbox" onChange={() => setRoundTrip(!roundTrip)} defaultChecked={roundTrip} />
                                        </div>
                                </div>
                                <div className="d-flex align-items-center">
                                <p className="m-0">Allow to optimize the Route?</p>
                                        <div className="form-check form-switch d-flex align-items-center ps-3">
                                            <input className="form-check-input m-0" type="checkbox" onChange={() => setReOrder(!reOrder)} defaultChecked={reOrder} />
                                        </div>
                                </div>
                                <div className="d-flex align-items-center">
                                <p className="m-0">Show accommodations nearby?</p> 
                                        <div className="form-check form-switch d-flex align-items-center ps-3">
                                            <input className="form-check-input m-0" type="checkbox" onChange={() => setShowAcco(!showAcco)} defaultChecked={showAcco} />
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
                                                { Locations && Locations.length !== 0 ? Locations.map((item,index)=>{
                                                    return (
                                                        <tr className="table-active" key={index}>
                                                            <th scope="row">{index+1}</th>
                                                            <td>{item.place_name}</td>
                                                            <td className="text-end" style={{fontSize:"1em"}}> <span onClick={() => DeleteLocation(index)} style={{cursor:'pointer'}}><FaTrash /></span></td>
                                                        </tr>
                                                    )
                                                }) : 
                                                    <tr className="table-active">
                                                        <td colSpan="3">No Locations</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mt-2 gap-2">
                                <button className="btn btn-sm px-4 py-1 btn-primary " onClick={() => calculateRoute()}>Calculate</button>
                                <button className="btn btn-sm px-4 py-1 btn-outline-primary" onClick={() => clearRoute()}>Clear</button>
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