// Part3
// This part is about showing our object on a VR canvas
// a. Create scene to show the object using Three.js
// b. The scene is append to the div whose id is "vrcontainer"
// c. Default model will show in the canvas
// d. When users change their choices, the scene should change corresponding to the info define in part2
var container, stats, camera, scene, renderer, geometry, gl_geometry;
var mesh, mixer;
var canvaswidth = 400;
var canvasheight = 550;
var p_x = 100;
var p_y = 50;
var p_z = 100;

init();
animate();

// init the canvas
function init() {
    // Get the container and set basic attributes
    container = document.getElementById("vrcontainer");
    camera = new THREE.OrthographicCamera( -150, 150, 150, -150, - canvaswidth, canvasheight );
    camera.position.x = p_x;
    camera.position.y = p_y;
    camera.position.z = p_z;
    // Scene
    scene = new THREE.Scene();
    // Grid
    loadGrid();
    // Load object
    loadObj("js/threejs/models/puzzles/tinker.obj");
    // Light
    loadLight();
    // Render the scene
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor( 0xd8d0d1 );
    renderer.setSize( canvaswidth, canvasheight );
    // Append to the dom
    container.appendChild( renderer.domElement );
}

// Load Grid
function  loadGrid() {
    var size = 80, step = 20;
    var geometry = new THREE.Geometry();
    for ( var i = - size; i <= size; i += step ) {
        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

    }
    var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.3 } );
    var line = new THREE.LineSegments( geometry, material );
    line.position.set(-100,0,-100);
    scene.add( line );
}

// Load object
function loadObj(path) {
    loader = new THREE.OBJLoader();
    loader.load("js/threejs/models/puzzles/tinker.obj", function(geo){
        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        gl_geometry = geo;
        geo.children.forEach(function(child){
            child.material = material;
            child.geometry.computeFaceNormals();
            child.geometry.computeVertexNormals();
            mesh = geo;
            mesh.scale.set(5, 5, 5);
            mesh.rotation.x = 1.3;
            mesh.translateX(-50);
            mesh.translateY(50);
            mesh.translateZ(-50);
            scene.add(mesh);
        });
    });
}

// Light
function  loadLight() {
    var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );
    var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( -1, -1, -1 ).normalize();
    scene.add( light );
}

// Animation
function animate() {
    requestAnimationFrame(animate);
    render();
}

var prevTime = Date.now();
// Render
function render() {
    var timer = Date.now() * 0.0002;
    camera.position.x = Math.cos( timer ) * p_x - 100;
    camera.position.z = Math.sin( timer ) * p_z - 100;
    camera.lookAt(new THREE.Vector3(-100,0,-100));
    // animation implement
    if (mixer) {
        var time = Date.now();
        mixer.update( ( time - prevTime ) * 0.004 );
        prevTime = time;
    }
    renderer.render( scene, camera );
}

// Load mesh
function  loadMesh(geo, material) {
    geo.children.forEach(function(child){
        child.material = material;
        child.geometry.computeFaceNormals();
        child.geometry.computeVertexNormals();
        mesh = geo;
        mesh.scale.set(5, 5, 5);
        mesh.rotation.x = 1.3;
        scene.add(mesh);
    });
}

// Update the color
function changeColor(color){
    // var loader = new THREE.TextureLoader();
    // var texture = loader.load(texture);
    var material = new THREE.MeshPhongMaterial({
        color: color,
        // map: texture,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh( geometry ,material );
    scene.add(mesh);

    loadMesh(gl_geometry, material);
}
