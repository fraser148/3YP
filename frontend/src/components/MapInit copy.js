import React , {useEffect} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ id }) => {
    return (
        <div>
            <img className="drone-ico" src="./drone.png" alt="mini drone"/>
            <span>{id}</span>
        </div>
        
    )
};

var polygons = [];

const EditPlacea = (maps, field, boundary, map) => {
    console.log(maps)
        if (boundary !== undefined) {
            console.log(field)
            const tempField = []
            field.forEach(element => {
                tempField.push(new maps.LatLng(element.lat,element.lng))
            });
            console.log(tempField)
            console.log(boundary)
            boundary.setPath(tempField)
            boundary.setMap(map)
            console.log(boundary.getPath().td[0].lat())
        }
        console.log("center changed")
}

const EditPlace = (maps, field,  map) => {
    console.log(field)
    var boundary = new maps.Polygon({
        paths: field,
        editable: true,
        strokeColor: "#009DFF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#009DFF",
        fillOpacity: 0.35
    });

    boundary.setMap(map);
}



const BoundaryChange = (maps, setBoundary, boundary, setArea) => {
    const tempField = []
    const tempBoundary = []
    console.log(boundary.getPath());
    boundary.getPath().forEach(element => {
        tempField.push({lat: element.lat(), lng: element.lng()})
        tempBoundary.push(new maps.LatLng(element.lat(),element.lng()))
    });
    setArea(maps.geometry.spherical.computeArea(tempBoundary))
    setBoundary(tempField);
}

const handleApiLoaded = (map, maps, field, setBoundary, setArea) => {

    console.log("we are here!")
    
    var boundary = new maps.Polygon({
        paths: field,
        editable: true,
        strokeColor: "#009DFF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#009DFF",
        fillOpacity: 0.35
    });

    polygons.push(boundary)

    maps.event.addListener(boundary.getPath(), 'set_at', function() {BoundaryChange(maps, setBoundary, boundary, setArea)});
    maps.event.addListener(boundary.getPath(), 'insert_at', function() {BoundaryChange(maps, setBoundary, boundary,setArea)});

    // maps.event.addListener(map, "center_changed", function() {EditPlace(maps, field, boundary, map)});


    boundary.setMap(map);
}

const MapInit = ({ drones, boundary, setBoundary, setArea, center }) => {

    console.log(center);
    console.log(boundary)
    
    const centr = {
        lat: Number(center[0]),
        lng: Number(center[1])
    };

    const zoom = 16;

    return (
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCl4sjXh_chPd5qt_6-Sp5Hz7QILghSBXA" }}
                defaultCenter={{lat:4.352130, lng:50.845926}}
                center={centr}
                defaultZoom={zoom}
                className="map-main"
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, boundary, setBoundary, setArea)}
            >
            {drones.map((drone) => (
                <AnyReactComponent
                    key={drone.id}
                    lat={drone.location.lat}
                    lng={drone.location.lng}
                    id={drone.id}
                />
            ))}
                
            </GoogleMapReact>
        </div>
        
    )
}

export default MapInit;