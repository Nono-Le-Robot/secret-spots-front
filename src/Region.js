import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { MeshStandardMaterial, Box3, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { Color } from 'three';
import { Marker } from './Marker';

function makePunchyColor(colorHex, factor = 1.2) {
  const color = new Color(colorHex);
  color.offsetHSL(0, factor - 1, factor - 1);
  return `#${color.getHexString()}`;
}

export function Region({ name, displayName, offsetXText, offsetYText, color, geometryRef, position, onClick, isActive }) {
  const { nodes } = useGLTF(`/models/${name}.glb`);
  const [hovered, setHovered] = useState(false);
  const [center, setCenter] = useState(new Vector3());
  const [step, setStep] = useState(0);

  

// Déclaration de `steps` sans l'initialiser
let steps;

// Utilisation du switch pour définir les étapes en fonction de `displayName`
switch (displayName) {
  case "Hauts-de-France":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.2, -0.2, 0.1],
    ];
    break;
  case "Grand-Est":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.5, -0.2, 0.2],
    ];
    break;
  case "Normandie":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.4, -0.4, 0.3],
    ];
    break;
  case "Ile-de-France":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.5, -0.8, 0.7],
    ];
    break;
  case "Bretagne":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.3, -0.3, 0.25],
    ];
    break;
  case "Pays-de-la-Loire":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.3, -0.35, 0.3],
    ];
    break;
  case "Centre-Val-De-Loire":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.2, -0.20, 0.15],
    ];
    break;
  case "Bourgogne-Franche-Comté":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.4, -0.2, 0.1],
    ];
    break;
  case "Nouvelle-Aquitaine":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.6, -0, 0.1],
    ];
    break;
  case "Auvergne-Rhône-Alpes":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.6, -0.2, 0.15],
    ];
    break;
  case "Occitanie":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.6, -0.2, 0.2],
    ];
    break;
  case "Provence-Alpes-Côte-d'Azur":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.3, -0.2, 0.1],
    ];
    break;
  case "Corse":
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.4, -0.7, 0.6],
    ];
    break;
  default:
    steps = [
      [position[0], position[1], position[2] + 0.2],
      [3.5, 0, 0.1],
    ];
    break;
}

  const { animatedPosition } = useSpring({
    animatedPosition: isActive ? steps[step] : position, // ici
    config: { mass: 2, tension: 120, friction: 24 },
    onRest: () => {
      if (isActive && step < steps.length - 1) {
        setStep((prev) => prev + 1);
        
        document.getElementById("overlay").classList.remove("slide-out")
        
        document.getElementById("overlay").classList.add("slide-in")
      } else if (!isActive && step > 0) {
        setStep((prev) => prev - 1); // Revenir en arrière
      }
    },
  });

  const handleClick = (event) => {
    event.stopPropagation();
    onClick(); // Gestion de l'état actif de la région dans le parent
    if(isActive){
      document.getElementById("overlay").classList.remove("slide-in");
      document.getElementById("overlay").classList.add("slide-out");
    }
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    if (!isActive) setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  useEffect(() => {
    if (nodes[geometryRef]) {
      const mesh = nodes[geometryRef];
      const box = new Box3().setFromObject(mesh);
      const boxCenter = new Vector3();
      box.getCenter(boxCenter);
      mesh.localToWorld(boxCenter);
      setCenter(boxCenter);
    }
  }, [nodes, geometryRef]);

  return (
    <a.group position={animatedPosition} dispose={null}>
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
        geometry={nodes[geometryRef].geometry}
        material={
          new MeshStandardMaterial({
            color: hovered ? makePunchyColor(color, 1.1) : color,
            roughness: 0.5,
            metalness: 0.1,
          })
        }
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.025}
      />

      <Text
        position={[offsetXText, offsetYText, 0.13]}
        fontSize={0.05}
        color={hovered ? 'black' : 'black'}
        anchorX="center"
        anchorY="middle"
      >
        {isActive ? "" : displayName}
      </Text>

      {isActive && <Marker position={[0, 0, 0.09]} angle={-Math.PI / 2 + 1} color="red" />}
    </a.group>
  );
}
