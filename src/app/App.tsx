import React from 'react';
import MapView from '../features/map/components/MapView';
import '../shared/styles/index.css';

const App: React.FC = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <MapView />
    </div>
  );
};

export default App;