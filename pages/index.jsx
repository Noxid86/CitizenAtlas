import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import Planet from "./lib/Planet";
import Marker from "./lib/Marker";
import Rotation from "./lib/Rotation";
import trilaterate from "./lib/Trilateration";
import frankenLateration from "./lib/FrankenLateration";

export default function Home() {
  let gui;

  const initGui = async () => {
    const dat = await import("dat.gui");
    gui = new dat.GUI();
  };

  useEffect(async () => {
    // TODO: Understand this code later.
    let test = new SceneInit();
    test.initScene();
    test.animate();

    const lyriaGeometry = new THREE.SphereGeometry(224);
    const lyriaTexture = new THREE.TextureLoader().load("LyriaTemp.jpeg");
    const lyriaMaterial = new THREE.MeshBasicMaterial({ map: lyriaTexture });
    const lyriaMesh = new THREE.Mesh(lyriaGeometry, lyriaMaterial);
    const solarSystem = new THREE.Group();
    solarSystem.add(lyriaMesh);
    test.scene.add(solarSystem);

    let markers = []
    
    const om1 = new Marker(0,  328.2, 0, {texture:'om1.png'})
    const om2 = new Marker(0, -328.2, 0, {texture:'om2.png'})
    const om3 = new Marker( 328.2, 0, 0, {texture:'om3.png'})
    const om4 = new Marker(-328.2, 0, 0, {texture:'om4.png'})
    const om5 = new Marker(0, 0, 328.2, {texture:'om5.png'})
    const om6 = new Marker(0, 0, -328.2, {texture:'om6.png'})
    markers.push(om1.getMesh(), om2.getMesh(), om3.getMesh(), om4.getMesh(), om5.getMesh(), om6.getMesh())
    let reference = {}
    reference["OM-1"] = om1
    reference["OM-2"] = om2
    reference["OM-3"] = om3
    reference["OM-4"] = om4
    reference["OM-5"] = om5
    reference["OM-6"] = om6

    fetch('./locations.json').then(function(data){
      return data.json()
    }).then(function(data){
      let vectors = []
      data.distances.map(function(distance){
        if(distance.points.includes("SPAL-3")){
          vectors.push(distance)
        }
      })
      let preparedVectors = vectors.map(function(vector){
        let om = vector.points[0].includes('OM-')? vector.points[0] : vector.points[1];
        return reference[om].getCoords(vector.distance)
      })
      console.log(frankenLateration(preparedVectors))
      let markerSolutions = trilaterate(
        om3.getCoords(388),
        om4.getCoords(406.4),
        om5.getCoords(542.7),
        false
      );
      // console.log(markerSolutions)
      let colors = [
        "red", "blue", "yellow", "orange", "purple"
      ]
      markerSolutions.forEach(function(sol, index){
        markers.push(new Marker(sol.x, sol.y, sol.z, {color: colors[index]}).getMesh())
      })
      let lyriaSystem = new THREE.Group();
      markers.forEach(function(marker){
        lyriaSystem.add(marker)
      })
      solarSystem.add(lyriaSystem);
    })





    // // NOTE: Add solar system mesh GUI.
    // await initGui();
    // const solarSystemGui = gui.addFolder("solar system");

  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
