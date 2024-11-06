import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Rectangle } from 'react-leaflet';
import axios from 'axios';

const LeafletMap = () => {
    const position = [46.6034, 1.8883]; // Centre de la France
    const zoomLevel = 6;

    const userId = "user123"; // Identifiant de l'utilisateur (ou généré dynamiquement)
    const franceBounds = [[51, -5], [42, 8]];

    const [isDiscovered, setIsDiscovered] = useState(false);

    useEffect(() => {
        // Récupérer l'état de découverte depuis le backend
        axios.get(`http://localhost:5000/api/discovery/${userId}`)
            .then((response) => {
                setIsDiscovered(response.data.isDiscovered);
            })
            .catch((error) => console.error("Error fetching discovery status:", error));
    }, [userId]);

    const handleDiscover = () => {
        setIsDiscovered(true);

        // Mettre à jour l'état de découverte dans le backend
        axios.post(`http://localhost:5000/api/discovery`, {
            userId,
            isDiscovered: true
        }).catch((error) => console.error("Error updating discovery status:", error));
    };

    return (
        <MapContainer center={position} zoom={zoomLevel} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <Rectangle
                bounds={franceBounds}
                pathOptions={{
                    color: 'white',
                    fillColor: 'white',
                    fillOpacity: isDiscovered ? 0 : 0.8,
                }}
                eventHandlers={{
                    click: handleDiscover,
                }}
            />
        </MapContainer>
    );
};

export default LeafletMap;


