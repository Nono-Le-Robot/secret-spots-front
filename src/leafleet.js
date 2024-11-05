import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Pour afficher correctement les icônes de marqueurs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Leafleet = () => {
    // Coordonnées du centre de la France
    const position = [46.6034, 1.8883]; // Centre de la France
    const zoomLevel = 6; // Niveau de zoom

    return (
        <MapContainer center={position} zoom={zoomLevel} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    Centre de la France.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Leafleet;
