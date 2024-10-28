import React from 'react';
import { useMap } from 'react-leaflet';
import { Object } from '../../../shared/types/commonTypes';

const MapZoomTo: React.FC<{ selectedObject: Object }> = ({ selectedObject }) => {
  const map = useMap();
  map.setView([selectedObject.latitude, selectedObject.longitude], 10);
  return null;
};

export default MapZoomTo;