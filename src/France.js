import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Region } from "./Region";
import * as THREE from "three";

function AnimatedCamera() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = 0.7302 + Math.sin(t * 0.2) * 0.05; // Slow oscillation on the x-axis
    camera.position.y = -0.5664 + Math.cos(t * 0.2) * 0.05; // Slow oscillation on the y-axis
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Keep the camera focused on the center
  });
  return null; // No visual component to render
}

function App() {
  const [activeRegion, setActiveRegion] = useState(null);

  const handleRegionClick = (regionName) => {
    setActiveRegion(regionName);
    alert(regionName);
  };

  const regions = [
    { name: "HautsDeFrance", displayName: "Hauts-de-France", color: "#A4C3B2", geometryRef: "Hauts-de-France", position: [0.012, 1.47, -0.064] },
    { name: "GrandEst", displayName: "Grand-Est", color: "#C3AFCB", geometryRef: "Grand_Est", position: [0.81, 1.02, -0.064] },
    { name: "Normandie", displayName: "Normandie", color: "#BFD7EA", geometryRef: "Normandy", position: [-0.742, 1.133, -0.064] },
    { name: "IleDeFrance", displayName: "Ile-de-France", color: "#D9BF77", geometryRef: "Île-de-France", position: [-0.066, 0.946, -0.064] },
    { name: "Bretagne", displayName: "Bretagne", color: "#B9C5D3", geometryRef: "Brittany", position: [-1.514, 0.784, -0.064] },
    { name: "PaysDeLaLoire", displayName: "Pays-de-la-Loire", color: "#D6E
