"use client";
import React from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

type MapProps = {
  center?: number[];
};

const Map = (props: MapProps) => {
  return (
    <MapContainer
      center={(props.center as L.LatLngExpression) || [51, -0.09]}
      zoom={props.center ? 4 : 2}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {props.center && <Marker position={props.center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
