import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ id, index, selected }) => {
    if (selected === index) {
        return (
            <div>
                <img className="drone-ico" src="./drone-selected.png" alt="mini drone"/>
                <span>{id}</span>
            </div>
            
        )
    } else {
        return (
            <div>
                <img className="drone-ico" src="./drone.png" alt="mini drone"/>
                <span>{id}</span>
            </div>
            
        )

    }

};

const handleApiLoaded = (map, maps) => {
    const field = [
        { lat: 51.75423118080835, lng: -1.2565135404143575 },
        { lat: 51.75440726625279, lng: -1.2553188436305536 },
        { lat: 51.75410114803945, lng: -1.255275081843601 },
        { lat: 51.754022586391606, lng: -1.25562955230903 },
        { lat: 51.75354850459475, lng: -1.2554457528127159 },
        { lat: 51.753418469860236, lng: -1.2561765746548232 }
    ];
    // const field = [
    //     new maps.LatLng(37.772323, -122.214897),
    //     new maps.LatLng(21.291982, -157.821856),
    //     new maps.LatLng(-18.142599, 178.431),
    //     new maps.LatLng(-27.46758, 153.027892),
    //   ];

    var bermudaTriangle = new maps.Polygon({
        paths: field,
        editable: true,
        strokeColor: "#009DFF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#009DFF",
        fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
}

const Map = ({ drones, selected }) => {

    const center = {
        lat: 51.75377600289503,
        lng: -1.2560615958119348
    };

    const zoom = 17;

    return (
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCl4sjXh_chPd5qt_6-Sp5Hz7QILghSBXA" }}
                defaultCenter={center}
                defaultZoom={zoom}
                className="map-main"
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
            {drones.map((drone, index) => (
                <AnyReactComponent
                    key={index}
                    lat={drone.location.lat}
                    lng={drone.location.lng}
                    id={drone.id}
                    index={index}
                    selected={selected}
                />
            ))}
                
            </GoogleMapReact>
        </div>
        
    )
}

export default Map;