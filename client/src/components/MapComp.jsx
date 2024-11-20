import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure this is properly loaded
import { useSelector } from 'react-redux';
import L from 'leaflet';

// Online marker icon and shadow URLs
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41], // Icon size
    iconAnchor: [12, 41], // Anchor point of icon
    popupAnchor: [1, -34], // Popup position relative to icon
    shadowSize: [41, 41], // Shadow size
});

const MapComp = () => {
    const [latitude, setLatitude] = useState(21.17); // Default: Surat, India
    const [longitude, setLongitude] = useState(72.83); // Default: Surat, India

    const location = useSelector((state) => state); // Get location from Redux store

    useEffect(() => {
        if (location) {
            console.log('Location from Redux map:', location);
            const { latitude: lat, longitude: lon } = location;

            if (lat && lon) {
                setLatitude(lat);
                setLongitude(lon);
            }
        }
    }, [location]);

    console.log(latitude, longitude); // Debugging

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={16}
            style={{ height: '800px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>
                    Current Location: ({latitude}, {longitude})
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComp;
