import * as THREE from "three";
import Experience from "../Experience.js";
import { ENV_DATA } from "../../data/environmentData.js";
import gsap from "gsap";
import MittInstance  from "../../core/lib/MittInstance.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.raycaster = this.experience.raycaster;

    this.envData = ENV_DATA[0];
    this.aciveSprite = false

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
    this.setPins();

    MittInstance.on("changeScene", (params) => {
      this.removePins();
      this.envData = ENV_DATA[params.data.id];
      this.setTexture(this.envData.name);
      this.setPins();
    });
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(50, 32, 32);
  }

  setTextures() {
    this.textures = {};
    for (const [key, value] of Object.entries(this.resources.items)) {
      if (key.includes("landscape")) {
        value.colorSpace = THREE.SRGBColorSpace;
        this.textures[key] = value;
      }
    }
  }

  setTexture(name) {
    this.material.map = this.textures[name];
    this.material.map.name = name;
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: this.textures.landscape1,
    });
    this.material.map.name = "landscape1";
  }

  checkPosition(mousePos) {
    let mouse = new THREE.Vector2(mousePos.x, mousePos.y);
    this.raycaster.instance.setFromCamera(mouse, this.experience.camera.instance);
    // const intersects = this.raycaster.instance.intersectObject(this.mesh);
    const intersects = this.raycaster.instance.intersectObject(this.scene);
    intersects.forEach((intersect) => {
      if (intersect.object.type === "Sprite") {
        // let spriteDataEnv = this.envData.find((env) => {
        //   return env.name === this.material.map.name
        // });
        let spriteDataPin = this.envData.pins.find((pin) => {
          return pin.name === intersect.object.name;
        });
        MittInstance.emit("displayModal", spriteDataPin);
      }
    })
  }

  checkHover(mousePos) {
    let mouse = new THREE.Vector2(mousePos.x, mousePos.y);
    this.raycaster.instance.setFromCamera(mouse,this.experience.camera.instance);
    const intersects = this.raycaster.instance.intersectObject(this.scene);
    let foundSprite = false;

    intersects.forEach((intersect) => {
      if (intersect.object.type === "Sprite") {
        foundSprite = true;
        this.aciveSprite = intersect.object;
        gsap.to(intersect.object.scale, {
          x: 1.4,
          y: 1.4,
          z: 1.4,
          duration: 0.5,
        });
      }
      if (foundSprite === false && this.aciveSprite) {
        gsap.to(this.aciveSprite.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
        });
        this.aciveSprite = false;
      }
    });
  }

  setPins() {
    const spriteMap = this.resources.items.pin;
    const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, transparent: true });
    this.envData.pins.forEach((pin) => {
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(pin.position.x, pin.position.y, pin.position.z);
      sprite.name = pin.name
      this.scene.add(sprite);
    });
  }

  removePins() {
    this.envData.pins.forEach((pin) => {
      const sprite = this.scene.getObjectByName(pin.name);
      this.scene.remove(sprite);
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }
}
