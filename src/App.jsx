import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Feature from './components/Feature';
import { Canvas } from '@react-three/fiber'
import ShapeLine from './components/ShapeLine';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feature" element={<Feature/>} />
      <Route path="/shape" element={
        <Canvas style={{ width: '100vw', height: '100vh' }}>
      <ShapeLine />
    </Canvas>
      } />

    </Routes>
  );
}

export default App;
