import React from 'react';
import { useMap } from 'react-leaflet';

interface Object {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const MapZoomTo: React.FC<{ selectedObject: Object }> = ({ selectedObject }) => {
  const map = useMap();
  map.setView([selectedObject.latitude, selectedObject.longitude], 10);
  return null;
};

export default MapZoomTo;