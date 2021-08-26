import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import { NotificationSystem } from "components";
const LocationMarker = (props: any) => {
  const { setLocation, origin } = props;
  const [position, setPosition] = useState(origin);
  const [acceptedLocation, setAcceptedLocation] = useState(true);
  useEffect(() => {
    setLocation(position);
  }, [position, setLocation]);
  const map = useMapEvents({
    click(e) {
      if (!acceptedLocation) {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      } else {
        map.locate({ enableHighAccuracy: true });
      }
    },
    locationfound(e) {
      NotificationSystem({
        message: "Ubicacion aproximada localizada correctamente",
        type: "success",
      });
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      map.flyTo(e.latlng, map.getZoom());
      setAcceptedLocation(false);
    },
    locationerror() {
      NotificationSystem({
        message: "Ubicacion aproximada no encontrada",
        type: "error",
      });
      setAcceptedLocation(false);
    },
  });

  return position === null ? null : (
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    ></Marker>
  );
};
interface LocationProps {
  latLng?: any;
}
const useBranchMapLocation = (props: LocationProps) => {
  const [location, setLocation] = useState(() => {
    if (props.latLng) {
      if (props.latLng.lat && props.latLng) {
        return { lat: props.latLng.lat, lng: props.latLng.lng };
      } else {
        return { lat: -17.7883, lng: -63.1808 };
      }
    } else {
      return { lat: -17.7883, lng: -63.1808 };
    }
  });
  const setLanLng = (data: any) => {
    setLocation(data);
  };
  const getLatLng = () => {
    return location;
  };
  const renderMap = () => {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <MapContainer
          style={{ height: "300px", width: "100%" }}
          center={location}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker origin={location} setLocation={setLocation} />
        </MapContainer>
      </div>
    );
  };
  return [renderMap(), getLatLng(), setLanLng] as const;
};
export default useBranchMapLocation;
