import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Raycaster {
  constructor() {
    this.experience = new Experience();
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.Raycaster();
  }
}
