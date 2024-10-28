import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { Object } from '../../../shared/types/commonTypes';
import { objects } from '../model/objects';
import MapZoomTo from './MapZoomTo';
import SearchWidget from '../../../shared/ui/SearchWidget';

const MapView: React.FC = () => {
  const [selectedObject, setSelectedObject] = useState<Object | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleObjects, setVisibleObjects] = useState<Set<number>>(new Set(objects.map(obj => obj.id)));

  const filteredObjects = useMemo(() => 
    objects.filter(obj =>
      obj.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const handleSelectObject = (obj: Object) => {
    setSelectedObject(obj);
  };

  const handleToggleVisibility = (id: number) => {
    setVisibleObjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const mapCenter: LatLngExpression = [50, 10];

  return (
    <>
      <MapContainer center={mapCenter} zoom={3} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredObjects.map(obj => (
          visibleObjects.has(obj.id) && (
            <Marker
              key={obj.id}
              position={[obj.latitude, obj.longitude]}
            />
          )
        ))}
        {selectedObject && <MapZoomTo selectedObject={selectedObject} />}
      </MapContainer>
      <SearchWidget
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredObjects={filteredObjects}
        handleSelectObject={handleSelectObject}
        selectedObject={selectedObject}
        handleToggleVisibility={handleToggleVisibility}
        visibleObjects={visibleObjects}
      />
    </>
  );
};

export default MapView;