import { useSpring } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect } from "react";

function CameraController({ activeRegion }) {
  const { camera } = useThree();
  const [step, setStep] = useState(0);

  // Position et lookAt basés sur l'état de la région active
  const positionSteps = activeRegion
    ? [[0, -2, 5], [3.8, -1.5, 1.4]]
    : [[0, -2, 5.1], [0, -2, 5.1]];

  const lookAtSteps = activeRegion
    ? [[0, 0, 0], [4, 0, 0]]  // Coordonnées de la région déplacée
    : [[0, 0, 0], [0, 0, 0]];

  const { position, lookAt } = useSpring({
    position: positionSteps[step],
    lookAt: lookAtSteps[step],
    config: { mass: 2, tension: 120, friction: 24 },
    onRest: () => {
      if (step < positionSteps.length - 1) {
        setStep(step + 1);
      }
    },
  });

  useFrame(() => {
    camera.position.set(...position.get());
    camera.lookAt(...lookAt.get());
    // console.log(camera.position)
    // console.log(camera.lookAt)
  });

  useEffect(() => {
    setStep(0); // Réinitialiser l'animation lorsqu'une nouvelle région est active
  }, [activeRegion]);

  return null;
}

export default CameraController;
