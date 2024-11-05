import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Region } from "./Region";
import { useSpring, a } from '@react-spring/three';
import { Marker } from "./Marker";
import CameraController from "./CameraController";




function App() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [displayName, setDisplayName] = useState(null)

  const handleRegionClick = (regionName) => {
    setActiveRegion(regionName === activeRegion ? null : regionName); 
    const selectedRegion = regions.filter(p => p.name === regionName )
    setDisplayName(selectedRegion[0].displayName)
    console.log(selectedRegion)

  };

  
































 
  const regions = [
    { name: "HautsDeFrance", displayName: "Hauts-de-France", offsetXText: 0, offsetYText: 0, color: "#8AA29E", geometryRef: "Hauts-de-France", position: [0.012, 1.47, -0.064] },
    { name: "GrandEst", displayName: "Grand-Est", offsetXText: -0.05, offsetYText: -0.05, color: "#A480CF", geometryRef: "Grand_Est", position: [0.81, 1.02, -0.064] },
    { name: "Normandie", displayName: "Normandie", offsetXText: -0.01, offsetYText: -0.05, color: "#7EA3D4", geometryRef: "Normandy", position: [-0.742, 1.133, -0.064] },
    { name: "IleDeFrance", displayName: "Ile-de-France", offsetXText: 0, offsetYText: 0, color: "#D1A054", geometryRef: "Île-de-France", position: [-0.066, 0.946, -0.064] },
    { name: "Bretagne", displayName: "Bretagne", offsetXText: 0, offsetYText: 0, color: "#8CA3BC", geometryRef: "Brittany", position: [-1.514, 0.784, -0.064] },
    { name: "PaysDeLaLoire", displayName: "Pays-de-la-Loire", offsetXText: -0.03, offsetYText: 0, color: "#A3D3B5", geometryRef: "Pays-de-la-Loire", position: [-0.972, 0.456, -0.064] },
    { name: "CentreValDeLoire", displayName: "Centre-Val-De-Loire", offsetXText: 0, offsetYText: -0.08, color: "#D3926B", geometryRef: "Centre-Val_de_Loire", position: [-0.315, 0.535, -0.064] },
    { name: "BourgogneFrancheComte", displayName: "Bourgogne-Franche-Comté", offsetXText: 0, offsetYText: -0.05, color: "#D9B776", geometryRef: "Bourgogne-Franche-Comté", position: [0.61, 0.389, -0.064] },
    { name: "NouvelleAquitaine", displayName: "Nouvelle-Aquitaine", offsetXText: 0, offsetYText: 0.15, color: "#96B987", geometryRef: "Nouvelle-Aquitaine", position: [-0.674, -0.525, -0.064] },
    { name: "AuvergneRhoneAlpes", displayName: "Auvergne-Rhône-Alpes", offsetXText: 0, offsetYText: 0, color: "#9E8FBF", geometryRef: "Auvergne-Rhône-Alpes", position: [0.538, -0.333, -0.064] },
    { name: "Occitanie", displayName: "Occitanie", offsetXText: 0, offsetYText: 0, color: "#FFA55E", geometryRef: "Occitania", position: [-0.138, -1.055, -0.064] },
    { name: "ProvenceAlpesCoteAzur", displayName: "Provence-Alpes-Côte-d'Azur", offsetXText: 0.01, offsetYText: -0.07, color: "#E78CB6", geometryRef: "Provence-Alpes-Cote-Azur", position: [0.949, -0.87, -0.064] },
    { name: "Corse", displayName: "Corse", color: "#E5A49E", geometryRef: "Corsica", offsetXText: 0.01, offsetYText: -0.05, position: [1.862, -1.583, -0.064] },
  ];

  return (
    <>
     <div id="overlay">
      <h1>{displayName}</h1>
      <img id="img-region" src="./models/images/test.jpg"></img>
      <h1>À la découverte de la région Auvergne-Rhône-Alpes</h1>

<h2>Entre Nature Sauvage et Villes Authentiques</h2>
<p>
    La région Auvergne-Rhône-Alpes est une destination captivante qui offre un incroyable mélange de paysages naturels et de villes historiques. 
    Des sommets imposants des Alpes aux volcans d’Auvergne, en passant par les charmantes villes comme Lyon, cette région séduit par sa diversité et son authenticité. 
    Chaque itinéraire dévoile des lieux uniques, parfaits pour une découverte riche en émotions et en panoramas saisissants.
</p>

<h2>Les Montagnes : Mont Blanc, Massif des Aravis et Chartreuse</h2>
<p>
    Les montagnes de la région sont parmi les plus majestueuses d'Europe. Le Mont Blanc, « toit de l’Europe », attire les aventuriers et les amoureux de grands espaces. 
    Les routes menant à Chamonix ou aux villages du Massif des Aravis offrent des points de vue à couper le souffle, idéaux pour s’immerger dans l’ambiance alpine. 
    Plus au sud, le parc naturel de la Chartreuse propose des sentiers de randonnée et des panoramas exceptionnels, entre forêts profondes et falaises vertigineuses.
</p>

<h2>Villes et Patrimoine : Lyon, Annecy, et Clermont-Ferrand</h2>
<p>
    La région est également riche en patrimoine urbain. Lyon, classée au patrimoine mondial de l’UNESCO, est incontournable pour ses ruelles historiques, 
    ses traboules secrètes et sa gastronomie renommée. Annecy, avec son lac turquoise et ses canaux pittoresques, offre un cadre enchanteur entre ville et nature. 
    Clermont-Ferrand, capitale historique de l’Auvergne, séduit par son architecture en pierre de lave et sa proximité avec les volcans.
</p>

<h2>Les Volcans et les Parcs Naturels : Auvergne, Vercors et Pilat</h2>
<p>
    Pour une immersion totale dans la nature, les volcans d’Auvergne sont à ne pas manquer. Le Parc naturel régional des Volcans d’Auvergne est le plus grand parc volcanique d’Europe, 
    avec ses dômes et cratères impressionnants. Plus à l’est, le Vercors offre des paysages sauvages propices aux randonnées, tandis que le Pilat, avec ses douces collines, invite à la détente 
    et à la contemplation. Auvergne-Rhône-Alpes est une région de contrastes, où chaque étape révèle de nouvelles merveilles naturelles et culturelles.
</p>

    </div>
   
    <div id="canvas-container">
      <Canvas camera={{ fov: 45, position: [0, -2, 5] }}>
        <CameraController activeRegion={activeRegion} />
        <OrbitControls />
        <ambientLight intensity={1.2} castShadow></ambientLight>
        <directionalLight position={[5, 10, 5]} intensity={1.3} castShadow />
        <pointLight position={[10, 10, 10]} intensity={0.4} />
        {/* <pointLight position={[-10, -10, -10]} intensity={1.8} /> */}


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

export default App;
