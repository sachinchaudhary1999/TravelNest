import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

// ✅ Fix default marker icon broken in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ Custom red marker matching TravelNest brand
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function Map({ latitude, longitude, title, city, isDarkMode }) {
  if (!latitude || !longitude) return null;

  const position = [parseFloat(latitude), parseFloat(longitude)];

  return (
    <div className={`rounded-2xl overflow-hidden border ${isDarkMode ? "border-slate-700" : "border-gray-200"}`} style={{ height: "320px" }}>
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        {/* MAP TILES — dark or light */}
        {isDarkMode ? (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
        ) : (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />
        )}

        {/* MARKER */}
        <Marker position={position} icon={redIcon}>
          <Popup>
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-gray-500">{city}</div>
          </Popup>
        </Marker>

        {/* CIRCLE — approximate area (privacy) like Airbnb */}
        <Circle
          center={position}
          radius={300}
          pathOptions={{
            color: "#FF385C",
            fillColor: "#FF385C",
            fillOpacity: 0.1,
            weight: 1,
          }}
        />
      </MapContainer>
    </div>
  );
}

export default Map;