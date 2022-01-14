import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ModelSpaceShip from '../assets/models/Spaceship.glb';
import ModelTestAnim from '../assets/models/Argon.fbx';
import ModelTest3D from '../assets/models/Argon.obj';
import ModelTest from '../assets/models/test1.glb';

export class Scene {
    constructor() {
        this.mixer = null;
        this.clock = new THREE.Clock();
    }

    init() {
        this.scene = new THREE.Scene();
        const loader = new GLTFLoader();
        const loaderFBX = new FBXLoader();
        const loaderOBJ = new OBJLoader();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            //alpha: true,
            precision: 'highp',
            preserveDrawingBuffer: true,
            canvas: document.querySelector('.spaceship'),
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.renderer.shadowMap.enabled = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        const helpers = new THREE.AxesHelper();
        this.scene.add(helpers);

        loader.load(ModelTest, (gltf) => {
            const model = gltf.scene;
            this.mixer = new THREE.AnimationMixer(model);
            const clip1 = gltf.animations[0];
            this.action1 = this.mixer.clipAction(clip1);
            this.scene.add(model);
            console.log(gltf);
        });

        this.scene.background = new THREE.Color(0xffffff);

        const rectLight = new THREE.RectAreaLight(0xffffff, 3, 10, 10);
        rectLight.position.set(0, 10, 0);
        rectLight.lookAt(0, 0, -5);
        this.scene.add(rectLight);

        this.camera.position.y = 3.8;
        this.camera.position.z = -2;
        this.camera.fov = 70;
        this.camera.updateProjectionMatrix();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        setTimeout(() => {
            this.render();
        }, 3000);
    }
    render() {
        requestAnimationFrame(() => {
            this.render();
        });

        const delta = this.clock.getDelta();
        this.mixer.update(delta);
        this.controls.update();

        this.renderer.render(this.scene, this.camera);
    }
}
