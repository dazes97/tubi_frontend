import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
interface LocationProps {
  lat?: any;
  lng: any;
  zoom?: number;
  width?: string | number;
  height?: string | number;
}
const MapRenderLocation = (props: LocationProps) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        style={{
          height: props.height ?? "300px",
          width: props.width ?? "100%",
        }}
        center={{ lat: props.lat, lng: props.lng }}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={{ lat: props.lat, lng: props.lng }}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        ></Marker>
      </MapContainer>
    </div>
  );
};
export default MapRenderLocation;
