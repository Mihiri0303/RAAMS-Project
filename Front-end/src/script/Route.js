import axios from "axios";

class Route {
    constructor(mapboxgl){
        this.mapboxgl = mapboxgl;
    }

    getRoute(Locations,Options = {},optimized = true){

        const roundtrip = Options.hasOwnProperty('roundtrip') ? Options.roundtrip : false;
        if(roundtrip){
            delete Options.destination;
        }

        const prams =  optimized ? Object.keys(Options).map((value,index) =>{
            return '&'+value+'='+Options[value];
        }).join('') : "";

        const routeType = optimized ? 'optimized-trips/v1' : 'directions/v5';
        return new Promise((resolve,reject) => {

            let waypointArray = Locations.map(item => {
                return item.lngLat.join(',');
            }).join(';');
            if(!optimized && roundtrip){
                waypointArray += ';' + Locations[0].lngLat[0] + ',' + Locations[0].lngLat[1];
            }
            axios.get(`https://api.mapbox.com/${routeType}/mapbox/driving/${waypointArray}?geometries=geojson${prams}&overview=full&access_token=${this.mapboxgl.accessToken}`)
            .then(response => {
                response.coordinates = response.data[optimized ? 'trips':'routes'][0].geometry.coordinates;
                resolve(response)
            }).catch(err => reject(err));
        });
    }

    getGeoLocation(lng,lat){
        return new Promise((resolve,reject) => {
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${this.mapboxgl.accessToken}`)
            .then(response => {
                resolve(response.data.features.filter(feature => feature.place_type !== 'neighborhood'))
            })
            .catch(error => reject(error));
        });
    }
}

export default Route;