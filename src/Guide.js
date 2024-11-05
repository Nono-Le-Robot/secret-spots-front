import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Region } from "./Region";
import { useSpring, a } from '@react-spring/three';
import { Marker } from "./Marker";
import CameraController from "./CameraController";
import regions from "./RegionList";
import Overlay from "./Overlay";

function Guide() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [displayName, setDisplayName] = useState(null)

  const handleRegionClick = (regionName) => {
    setActiveRegion(regionName === activeRegion ? null : regionName); 
    const selectedRegion = regions.filter(p => p.name === regionName )
    setDisplayName(selectedRegion[0].displayName)
    console.log(selectedRegion)

  };

  return (
    <>
    <Overlay displayName={displayName}></Overlay>
    <div id="canvas-container">
      <Canvas camera={{ fov: 45, position: [0, -2, 5] }}>
        <CameraController activeRegion={activeRegion} />
        <OrbitControls />
        <ambientLight intensity={1.2} castShadow></ambientLight>
        <directionalLight position={[5, 10, 5]} intensity={1.3} castShadow />
        <pointLight position={[10, 10, 10]} intensity={0.4} />
        {regions.map(({ name, displayName, offsetXText, offsetYText, color, geometryRef, position }) => (
        <Region
          key={name}
          name={name}
          displayName={displayName}
          offsetXText={offsetXText}
          offsetYText={offsetYText}
          color={color}
          geometryRef={geometryRef}
          position={position}
          onClick={() => handleRegionClick(name)}
          isActive={name === activeRegion}
          >
          </Region>
        ))}
      </Canvas>
    </div>
        </>
  );
}

export default Guide;