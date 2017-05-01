// jQuery
window.jQuery || document.write('<script src="bootstrap/assets/js/vendor/jquery.min.js"><\/script>');

// Angular
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {

    // Part2 
    // This part is about loading information of our object 
    // 
    // a. These information should be loaded from the configure file, e.g xml file
    // b. Then show in the corresponding place in the html page using Angular.js model

    $scope.Materials = [
        {content : "Red", price : 15, color: 0xff0000},
        {content : "Green", price : 20, color: 0x00ff00},
    ];
    $scope.Borders = [
        {content : "Vertical", price : 2},
        {content : "Wave", price : 5}
    ];


    // Part3 
    // This part is about showing our object on a VR canvas 
    //
    // a. Create scene to show the object using Three.js
    // b. The scene is append to the div whose id is "vrcontainer"
    // c. Default model will show in the canvas
    // d. When users change their choices, the scene should change corresponding to the info define in part2

    var container, stats, camera, scene, projector, renderer, geometry, gl_geometry;
    var mesh, mixer;
    var canvaswidth = 400;
    var canvasheight = 550;
    var p_x = 100;
    var p_y = 50;
    var p_z = 50;
    init();
    animate();

    // init the canvas
    function init() {
        // Get the container and set basic attributes
        container = document.getElementById("vrcontainer");
        camera = new THREE.OrthographicCamera( -200, 200, 200, -200, - canvaswidth, canvasheight );
        camera.position.x = p_x;
        camera.position.y = p_y;
        camera.position.z = p_z;
        scene = new THREE.Scene();

        // // Grid
        // var size = 100, step = 50;
        // var geometry = new THREE.Geometry();
        // for ( var i = - size; i <= size; i += step ) {
        //   geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        //   geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
        //   geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        //   geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
        // }
        // var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
        // var line = new THREE.LineSegments( geometry, material );
        // scene.add(line);

        // Cubes
        // geometry = new THREE.BoxGeometry( 100, 100, 100 );
        // var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );
        // var cube = new THREE.Mesh( geometry, material );
        // cube.scale.y = 1;
        // cube.position.x = 0;
        // cube.position.y = 0;
        // cube.position.z = 0;
        // scene.add(cube);

        var loader = new THREE.OBJLoader();
        loader.load("js/threejs/models/puzzles/tinker.obj", function(geo){
            var material = new THREE.MeshLambertMaterial({
                color: 0x5c3a21
            });
            gl_geometry = geo;
            loadMesh(gl_geometry, material);
        });


        // Light
        var light = new THREE.DirectionalLight( 0xefefff, 1.5 );
        light.position.set( 1, 1, 1 ).normalize();
        scene.add( light );
        var light = new THREE.DirectionalLight( 0xffefef, 1.5 );
        light.position.set( -1, -1, -1 ).normalize();
        scene.add( light );

        // Render the scene 
        renderer = new THREE.CanvasRenderer();
        renderer.setClearColor( 0xf0f0f0 );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( canvaswidth, canvasheight );

        // Append to the dom 
        container.appendChild( renderer.domElement );
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
        camera.lookAt( scene.position );
        // animation implement
        if (mixer) {
            var time = Date.now();
            mixer.update( ( time - prevTime ) * 0.002 );
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
            mesh.rotation.x = 0.5;
            scene.add(mesh);
        });
    }

    // Update the texture
    function changeTexture(texture){
        var loader = new THREE.TextureLoader();
        var texture = loader.load(texture);
        var material = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            // map: texture,
            side: THREE.DoubleSide
        });
        var mesh = new THREE.Mesh( geometry ,material );
        scene.add(mesh);

        loadMesh(gl_geometry, material);
    }


    // Call back to response to the users' choices, 
    // e.g. when the selected Material is change, change the scene at the same time 
    $scope.$watch('selectedMaterial', function(val){
        console.log(val);
        var obj = eval (val);
        if(obj){
            changeTexture(obj.img);
        }
    },true);
});
