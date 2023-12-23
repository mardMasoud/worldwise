import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { cities } = useCities();
    const navigate = useNavigate();
    const { isLoading: isLoadingPosition, position: Geolocation, getPosition } = useGeolocation();
    const [lat, lng] = useUrlPosition();
    useEffect(
        function () {
            if (lat && lng) setMapPosition([lat, lng]);
        },
        [lat, lng]
    );
    useEffect(
        function () {
            if (Geolocation) setMapPosition([Geolocation.lat, Geolocation.lng]);
        },
        [Geolocation]
    );
    return (
        <div className={styles.mapContainer}>
            {!Geolocation && (
                <Button type="position" onclick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>
            )}
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}
function DetectClick() {
    const navigate = useNavigate();
    useMapEvent({
        click: (e) => {
            navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
            
        },
    });
}
