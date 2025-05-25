import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaLocationArrow } from 'react-icons/fa';
import { renderToStaticMarkup } from 'react-dom/server';

import pinIcon from 'leaflet/dist/images/marker-icon.png';
import pinShadow from 'leaflet/dist/images/marker-shadow.png';
import pinRetina from 'leaflet/dist/images/marker-icon-2x.png';

// React Icon as Leaflet Marker
const arrowMarkerIcon = L.divIcon({
  className: '',
  html: renderToStaticMarkup(
    <FaLocationArrow size={28} color="#007bff" />
  ),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Pin marker icon
const customPinIcon = new L.Icon({
  iconUrl: pinIcon,
  iconRetinaUrl: pinRetina,
  shadowUrl: pinShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Recenter map to location
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 16);
  }, [position, map]);
  return null;
};

// Allow pinning by clicking
const ClickToPin = ({ onPin }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onPin([lat, lng]);
    },
  });
  return null;
};

const MapView = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [position, setPosition] = useState([10.6765, 122.9509]);
  const [address, setAddress] = useState('Fetching address...');
  const [pin, setPin] = useState(null);
  const [pinLabel, setPinLabel] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = [latitude, longitude];
        setPosition(coords);

       

        try {
          const res = await fetch(`${API_URL}/api/reverse-geocode?lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          setAddress(data?.freeformAddress || 'Unknown address');
        } catch {
          setAddress('Error fetching address');
        }
      },
      (err) => {
        console.error('Location error:', err);
        alert('Unable to retrieve location');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const handleMapClick = async ([lat, lon]) => {
    let label = "Pinned location";
    try {
      const res = await fetch(`${API_URL}/api/reverse-geocode?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      label = data?.freeformAddress || label;
    } catch {
      label = "Pinned location (address unavailable)";
    }
    setPin([lat, lon]);
    setPinLabel(label);
  };

  return (
    <div className="w-full h-screen">
      <MapContainer center={position} zoom={16} scrollWheelZoom={true} className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <RecenterMap position={position} />
        <ClickToPin onPin={handleMapClick} />

        {/* User location with static arrow icon */}
        <Marker position={position} icon={arrowMarkerIcon}>
          <Popup>
            <strong>Your Location:</strong><br />
            {address}
            lat: {position[0]}
            long: {position[1]}
          </Popup>
        </Marker>

        {/* One pinned location only */}
        {pin && (
          <Marker position={pin} icon={customPinIcon}>
            <Popup>{pinLabel}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
