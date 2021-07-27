import React ,{ useState, useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl';
import Route from '../script/Route';
import { FaTrash } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux'; 

const Routr = (props) => {

    const mapContainer = useRef();
    const [lnglat, setLngLat] = useState([79.8998759,6.8278084]);
    const [zoom, setZoom] = useState(8);// eslint-disable-line
    const [Locations,setLocations] = useState([]);
    const [map,setMap] = useState();
    mapboxgl.accessToken = 'pk.eyJ1IjoibWloaXIzOTA5MyIsImEiOiJja3JsbTI3NWIxYjZyMnVtbDY4c3l2YTI1In0.JrooBRfiaudzvBh3Npz1ZQ';
    const [route,setRoute] = useState(new Route(mapboxgl));// eslint-disable-line
    const [accId,setAccId] = useState('');
    const [accoPoints,setAccoPoints] = useState([]);
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
    },[]);// eslint-disable-line

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
                setAccoPoints([]);
                if(showAcco) getNearbyAcc();
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

    const getNearbyAcc = async () => {
        await new Promise((resolve,reject) => {
            Locations.forEach(async (data,index) => {
                let Bounds = getCoordinateBounds(data.lngLat,10000);
                const query = {
                    $and : [
                        { Latitude : { $gte : Bounds.latRange[0]} },
                        { Latitude : { $lte : Bounds.latRange[1]} },
                        { Longitude : { $gte : Bounds.lngRange[0]} },
                        { Longitude : { $lte : Bounds.lngRange[1]} },
                    ]
                }
                try {
                    const accoList = await axios.post('/accommodation',query,{
                        headers : {
                            'Content-Type' : 'application/json',
                            'Accept' : 'application/json',
                        }
                    });
                    setAccoPoints(oldPoints => [...oldPoints,...accoList.data]);
                } catch (error) {
                    console.log(error);
                }
                if(index === (Locations.length - 1)) {
                    resolve();
                }
            });
        })
    }

    const getCoordinateBounds = (lnglat,radius) => {
        var ll = new mapboxgl.LngLat(lnglat[0],lnglat[1]);
        const bound = ll.toBounds(radius).toArray();
        const returnData = {
            latRange : [bound[0][1],bound[1][1]],
            lngRange : [bound[0][0],bound[1][0]],
        }
        return returnData;
    }

    useEffect(() => {
        addAccomoMarkers();
    },[accoPoints])// eslint-disable-line

    useEffect(() => {
        if(!showAcco){
            if(accoMarkers.length !== 0) accoMarkers.forEach(marker => marker.remove());
            setAccoMarkers([]);
        }else{
            addAccomoMarkers();
        }
    },[showAcco]);// eslint-disable-line 

    const addAccomoMarkers = () => {
        if(accoMarkers.length !== 0) accoMarkers.forEach(marker => marker.remove());
        setAccoMarkers([]);
        
        accoPoints.forEach(acc => {
            var el = document.createElement('div');
            el.className = 'marker';
            const popup = new mapboxgl.Popup({offset:12}).setHTML(popupEl(acc));
            const marker = new mapboxgl.Marker({
                element : el
            }).setLngLat([acc.Longitude,acc.Latitude])
            .setPopup(popup)
            .addTo(map);
            setAccoMarkers(markers => [...markers,marker]);
        });
    }

    useEffect(()=>{
        reserve();
    },[accId]);// eslint-disable-line

    const reserve = async () => {
        if(accId !== ''){
            if(props.user){
                try {
                    const acc = await axios.get('/accommodation/'+accId,{
                        headers : {
                            'Content-Type' : 'application/json',
                            'Accept' : 'application/json'
                        }
                    });
                    const accs = await axios.put('/reserve',{// eslint-disable-line
                        Acc_id : accId,
                        User_id : props.user._id,
                        Owner_id : acc.data.Owner_id._id
                    },{
                        headers : {
                            'Content-Type' : 'application/json',
                            'Accept' : 'application/json'
                        }
                    }); 
                    alert('Accommodation reserved!')
                } catch (error) {
                    alert('Something went wrong ! \nRetry ..!')
                }
                finally{
                    let { from } = location.state || { from: { pathname: "/routr" } };
                    history.replace(from);
                }
            }else{
                let { from } = location.state || { from: { pathname: "/login" } };
                history.replace(from);
            }
        }
    }

    const popupEl = (props) => {
        return `
            <div class="p-1 d-flex flex-column">
                <h5 class="fw-bolder m-0">${props.Title}</h5>
                <h6 class="fw-normal m-0" style="font-size:0.8rem">${props.Address}</h6>
                <h6 class="fw-normal m-0" style="font-size:0.8rem">${props.Type}</h6>
                <h5 class="fw-bolder mt-1">Rs.${props.Amount.toFixed(2)}<sub>/per day</sub></h5>
                <a href="/routr?reserve=${props._id}" class="btn btn-sm btn-danger mt-2 p-1">Reserve</a>
            </div>
        `;
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

export default connect(state => ({...state}))(Routr)