import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to recenter map on position change
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 16);
  }, [position, map]);
  return null;
};

const MapView = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [position, setPosition] = useState([10.6765, 122.9509]); // Default
  const [address, setAddress] = useState('Fetching address...');

  // Get user's location once
  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = [latitude, longitude];
        setPosition(coords);

        // Fetch address from backend
        try {
          const res = await fetch(
            `${API_URL}/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data && data.freeformAddress) {
            setAddress(data.freeformAddress);
          } else {
            setAddress('Address not found');
          }
        } catch (err) {
          console.error('Failed to fetch address', err);
          setAddress('Error fetching address');
        }
      },
      (err) => {
        console.error('Location error:', err);
        alert('Unable to retrieve your location');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <RecenterMap position={position} />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <strong>Your Location:</strong>
            <br />
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
