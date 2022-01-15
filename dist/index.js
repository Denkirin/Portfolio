// import './style.css'

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports/optimized/three.js';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import * as Table from './iceHockey.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight,0.1, 1000);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

if (window.mobileCheck()){
	
	camera.position.x = 2.25;
	camera.position.y = 2;
	camera.position.z = -0.5; 
	
}else{
	camera.position.x = 2.25;
	camera.position.y = 1.2;
	camera.position.z = -2.2; 	
}

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

// const wallsTexture = new THREE.TextureLoader().load('wall/texture.png',function ( texture ) {

    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.offset.set( 0, 0 );
    // texture.repeat.set( 6, 3 );

// } );
// const wallsNormal = new THREE.TextureLoader().load('wall/normal.png',function ( texture ) {

    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.offset.set( 0, 0 );
    // texture.repeat.set( 6, 3 );

// } );

// const walls = new THREE.Mesh(
	// new THREE.BoxGeometry(6,2,6),
	// new THREE.MeshStandardMaterial({ 
		// color: 0xaaFFaa,
		// side: THREE.BackSide })
	// );

// walls.position.x = 0;
// walls.position.y = 1;
// walls.position.z = 0;

// scene.add(walls);

// const floor = new THREE.Mesh(
	// new THREE.BoxGeometry(10,.01,10),
	// new THREE.MeshStandardMaterial({ 
		// color: 0x222222})
	// );

// floor.position.x = 0;
// floor.position.y = 0;
// floor.position.z = 0;

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


// const objLoader = new OBJLoader();

// function createArcade(x, y ,z, rot){
	// var arcadeGeo = new THREE.BufferGeometry();
	// objLoader.load("arcade.obj", function (mesh) {
	  // // Update the existing BufferGeometry with loaded data.
	  // arcadeGeo.copy( mesh.children[0].geometry );
	// });

	// const arcadeTexture = new THREE.TextureLoader().load('arcade/mapping.png');
	// const aoTexture = new THREE.TextureLoader().load('arcade/ao.png');

	// const arcadeMaterial = new THREE.MeshStandardMaterial({
		// map: arcadeTexture
		
		// });

	// const arcade = new THREE.Mesh(arcadeGeo,  arcadeMaterial);

	// arcade.position.x = x;
	// arcade.position.y = y;
	// arcade.position.z = z;
	// arcade.rotation.y = rot;

	// scene.add(arcade);
// }

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
