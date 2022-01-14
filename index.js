import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import * as Table from './iceHockey.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight,0.1, 1000);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.x = 2.25;
camera.position.y = 1.2;
camera.position.z = -2.2; 

camera.lookAt(2.25,0.5,0)

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

const pointLight = new THREE.PointLight(0xEEEEEE);
pointLight.position.set(5,3,0);

const ambientLight = new THREE.AmbientLight(0x555555);
scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper,gridHelper);

// room

const wallsTexture = new THREE.TextureLoader().load('wall/texture.png',function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 6, 3 );

} );
const wallsNormal = new THREE.TextureLoader().load('wall/normal.png',function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 6, 3 );

} );

const walls = new THREE.Mesh(
	new THREE.BoxGeometry(6,2,6),
	new THREE.MeshStandardMaterial({ 
		color: 0xaaFFaa,
		side: THREE.BackSide })
	);

walls.position.x = 0;
walls.position.y = 1;
walls.position.z = 0;

// scene.add(walls);

const floor = new THREE.Mesh(
	new THREE.BoxGeometry(10,.01,10),
	new THREE.MeshStandardMaterial({ 
		color: 0x222222})
	);

floor.position.x = 0;
floor.position.y = 0;
floor.position.z = 0;

// scene.add(floor);

function addBlock(sx,sy,sz,x,z,y= sy/2){
	const block = new THREE.Mesh(
	new THREE.BoxGeometry(sx,sy,sz),
	new THREE.MeshStandardMaterial({ 
		color: 0xFFAAAA})
	);

	block.position.x = x;
	block.position.y = y;
	block.position.z = z;

	scene.add(block);
}

// addBlock(0.8,1.5,0.8,-0.1,2.6)
// addBlock(0.8,1.5,0.8,0.8,2.6)
// addBlock(0.8,1.5,0.8,1.7,2.6)
// addBlock(0.8,1.5,0.8,2.6,2.6)


// // addBlock(1.5,0.6,2,2.25,-0.5)

// addBlock(2,1.5,2,-2,2)

// addBlock(0.8,1.2,0.8,-2.6,0)
// addBlock(0.8,1.2,0.8,-2.6,-0.9)
// addBlock(0.8,1.2,0.8,-2.6,-1.8)

// addBlock(0.1,0.1,0.1,0,-2)

// addBlock(0.1,0.1,0.1,2.25,0,0.65)

//ARCADE


const objLoader = new OBJLoader();

function createArcade(x, y ,z, rot){
	var arcadeGeo = new THREE.BufferGeometry();
	objLoader.load("arcade.obj", function (mesh) {
	  // Update the existing BufferGeometry with loaded data.
	  arcadeGeo.copy( mesh.children[0].geometry );
	});

	const arcadeTexture = new THREE.TextureLoader().load('arcade/mapping.png');
	const aoTexture = new THREE.TextureLoader().load('arcade/ao.png');

	const arcadeMaterial = new THREE.MeshStandardMaterial({
		map: arcadeTexture
		
		});

	const arcade = new THREE.Mesh(arcadeGeo,  arcadeMaterial);

	arcade.position.x = x;
	arcade.position.y = y;
	arcade.position.z = z;
	arcade.rotation.y = rot;

	scene.add(arcade);
}

// createArcade(3,0,-1,0);
// createArcade(4,0,-1,0);
// createArcade(5,0,-1,0);
// createArcade(3,0,1,Math.PI);
// createArcade(4,0,1,Math.PI);
// createArcade(5,0,1,Math.PI);

function moveCamera(){
	
	const t = document.body.getBoundingClientRect().top;
	moon.rotation.x += 0.05;
	moon.rotation.y += 0.075;
	moon.rotation.z += 0.05;
	
	// room.rotation.y += 0.01;
	// room.rotation.z += 0.01;
	
	camera.position.x = t * -0.002;
	camera.position.y = t * -0.002;
	camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera

// addBlock(1.5,0.6,2,2.25,-0.5)
const table = Table.Constructor(2.25,0.6,-0.5,1.5,0.1,2);

const tableMesh =  new THREE.Mesh(
		new THREE.BoxGeometry(table.sx,table.sy,table.sz),
		new THREE.MeshBasicMaterial({ 
			wireframe: true})
		);
		
tableMesh.position.x = table.x;
tableMesh.position.y = table.y;
tableMesh.position.z = table.z;

scene.add(tableMesh);

window.addEventListener( 'click', table.Start, false );
window.addEventListener( 'keydown', (event) => {
	if(event.key == "ArrowRight"){
		table.MovePlayer(-1);
	}else if(event.key == "ArrowLeft"){
		table.MovePlayer(1);
	}
}, false );

window.addEventListener( 'keyup', (event) => {
	if(event.key == "ArrowRight"){
		table.StopPlayer(-1);
	}else if(event.key == "ArrowLeft"){
		table.StopPlayer(1);
	}
}, false );

window.addEventListener( 'rightarrow', table.PlayerRight, false );

const diskMesh =  new THREE.Mesh(
		new THREE.CylinderGeometry(0.05,0.05,0.01,8),
		new THREE.MeshStandardMaterial({ 
			color: 0xFFAAFF})
		);

scene.add(diskMesh);

const opoMesh =  new THREE.Mesh(
		new THREE.CylinderGeometry(0.05,0.05,0.04,8),
		new THREE.MeshStandardMaterial({ 
			color: 0xFFAAFF})
		);

scene.add(opoMesh);

const playMesh =  new THREE.Mesh(
		new THREE.CylinderGeometry(0.05,0.05,0.04,8),
		new THREE.MeshStandardMaterial({ 
			color: 0xFFAAFF})
		);

scene.add(playMesh);


const armA =  new THREE.Mesh(
		new THREE.BoxGeometry(0.01,0.5,0.01),
		new THREE.MeshStandardMaterial({ 
			color: 0xAAAAFF})
		);

scene.add(armA);

const armB =  new THREE.Mesh(
		new THREE.BoxGeometry(0.01,0.5,0.01),
		new THREE.MeshStandardMaterial({ 
			color: 0xFFFFFF})
		);

scene.add(armB);


const dLine = new THREE.Mesh(
		new THREE.BoxGeometry(0.01,0.01,0.5),
		new THREE.MeshStandardMaterial({ 
			color: 0xFFFFFF})
		);

scene.add(dLine);

var old = Date.now();

function animate(){
	requestAnimationFrame(animate);
	
	// camera.rotation.y = Math.cos(clock)
	
	
	table.Update((Date.now() - old)/10);
	
	old = Date.now();
	
	diskMesh.position.x = table.disk.pos.x;
	diskMesh.position.y = table.disk.height;
	diskMesh.position.z = table.disk.pos.y;
	
	armA.rotation.x = Math.asin((table.oponent.z - table.uppYbound)/(2*0.5));
	armA.rotation.z = -Math.asin((table.oponent.x - table.x)/(2*0.5));
	
	armA.position.x = table.x - Math.sin(armA.rotation.z) * 0.25;
	armA.position.y = table.y + Math.cos(armA.rotation.z) * 0.25;
	armA.position.z = table.uppYbound + Math.sin(armA.rotation.x) * 0.25;
	
	armB.rotation.x = -armA.rotation.x;
	armB.rotation.z = -armA.rotation.z;
	
	armB.position.x = table.x + Math.sin(armB.rotation.z) * 0.75;
	armB.position.y = table.y + Math.cos(armB.rotation.z) * 0.25;
	armB.position.z = table.uppYbound - Math.sin(armB.rotation.x) * 0.75;
	
	// armB.position.x = table.x;
	// armB.position.y = table.y+0.;
	// armB.position.z = table.uppYbound;
	
	opoMesh.position.x = table.oponent.x;
	opoMesh.position.y = table.oponent.y;
	opoMesh.position.z = table.oponent.z;
	
	playMesh.position.x = table.player.x;
	playMesh.position.y = table.player.y;
	playMesh.position.z = table.player.z;
	
	dLine.position.x = table.disk.pos.x;
	dLine.position.y = table.disk.height;
	dLine.position.z = table.disk.pos.y;
	
	dLine.rotation.y = Math.PI/2 - Math.atan(table.disk.dir.y/table.disk.dir.x)
	
	renderer.render(scene,camera);
}

animate()
