// Part3
// This part is about showing our object on a VR canvas
// a. Create scene to show the object using Three.js
// b. The scene is append to the div whose id is "vrcontainer"
// c. Default model will show in the canvas
// d. When users change their choices, the scene should change corresponding to the info define in part2
var container, stats, camera, scene, renderer, gl_geometry, gl_color, gl_shape, gl_width, gl_height;
var mesh, mixer;
var isSingle = true;
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
    camera = new THREE.OrthographicCamera( -220, 220, 220, -220, - canvaswidth, canvasheight );
    camera.position.x = p_x;
    camera.position.y = p_y;
    camera.position.z = p_z;

    // Scene
    scene = new THREE.Scene();
    // Grid
    loadGrid();
    // Load object
    gl_color = 0xffffff;
    gl_shape = "egg";
    loadObj("models/"+gl_shape+"/0012.obj", 0, 0, -50, 8);

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
    var grid = new THREE.Geometry();
    for ( var i = - size; i <= size; i += step ) {
        grid.vertices.push( new THREE.Vector3( - size, 0, i ) );
        grid.vertices.push( new THREE.Vector3(   size, 0, i ) );
        grid.vertices.push( new THREE.Vector3( i, 0, - size ) );
        grid.vertices.push( new THREE.Vector3( i, 0,   size ) );

    }
    var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.3 } );
    var line = new THREE.LineSegments( grid, material );
    line.position.set(0,0,0);
    scene.add( line );
}

// Load object
function loadObj(path, dx, dy, dz, scale) {
    loader = new THREE.OBJLoader();
    loader.load(path, function(geo){
        material = new THREE.MeshLambertMaterial({
            color: gl_color
        });
        gl_geometry = geo;
        loadMesh(gl_geometry, material);
        gl_geometry.scale.set(scale, scale, scale);
        gl_geometry.rotation.x = 1.3;
        transObj(gl_geometry, dx, dy, dz);
        scene.add(gl_geometry);
    });
}
// Translate object
function transObj(obj, dx, dy, dz){
    obj.translateX(dx);
    obj.translateY(dy);
    obj.translateZ(dz);
    scene.add(obj);
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
    camera.position.x = Math.cos( timer ) * p_x;
    camera.position.z = Math.sin( timer ) * p_z;
    camera.lookAt(new THREE.Vector3(0,0,0));
    // animation implement
    if (mixer) {
        var time = Date.now();
        mixer.update( ( time - prevTime ) * 0.004 );
        prevTime = time;
    }
    renderer.render( scene, camera );
}

// Load mesh
function  loadMesh(obj, material) {
    obj.children.forEach(function(child){
        child.material = material;
        child.geometry.computeFaceNormals();
        child.geometry.computeVertexNormals();
        child.geometry.center();
    });
}

// Change the color
function changeColor(color){
    gl_color = color;
    var material = new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide
    });
    loadMesh(gl_geometry, material);
}

// Change the shape
function changeShape(shape){
    scene.remove( gl_geometry );
    gl_shape = shape;
    if(isSingle) {
        loadObj("models/" + shape + "/0012.obj", 0, 0, -50, 8);
    }
    else{
        loadLayout(shape);
    }
    changeColor(gl_color);
    render();
}

// Layout
function loadLayout(shape){
    loadObj("models/layout/" + shape + "_" + gl_width +"_"+ gl_height + ".obj", 0, 0, -50, 2);
}

// Change the width and height of the puzzle layout
function  changeSize(w, h) {
    gl_width = w;
    gl_height = h;
}

// Show size of the puzzle
function  changeView() {
    isSingle = !isSingle;
    changeShape(gl_shape);
}