import * as THREE from "three";

export default class Marker {
  constructor(posX, posY, posZ, attributes) {
    this.posX = posX;
    this.posY = posY;
    this.posZ = posZ;
    this.color = "rgb(0, 255, 4)";
    this.textureFile = null;
    if(attributes){
      this.color = attributes.color;
      this.textureFile = attributes.texture;
    }
  }
  getCoords(r){
    return {x: this.posX, y: this.posY, z: this.posZ, r:r}
  }
  getMesh() {
    const geometry = new THREE.BoxGeometry( 10, 10, 10 );
    const material = new THREE.MeshBasicMaterial( { color: this.color } );
    if(this.textureFile){
      const texture = new THREE.TextureLoader().load(this.textureFile);
      material = new THREE.MeshBasicMaterial({ map: texture });
    }
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.position.x += this.posX;
    this.mesh.position.y += this.posY;
    this.mesh.position.z += this.posZ;
    return this.mesh;
  }
}
