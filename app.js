var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add meshes to the scene
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100, subdivisions: 10}, scene);
    var bird = BABYLON.MeshBuilder.CreateBox("bird", {height: 0.5, width: 4, depth: 2}, scene);
    var rock1 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 3}, scene);

    // Add camera and link it to bird's location
    bird.position = new BABYLON.Vector3(0, 10, 0);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 10, bird.position, scene);
    
    // For input control all cameras need to be attached to the canvas once constructed
    camera.attachControl(canvas, true);

    // Add light to the scene
    var sun = new BABYLON.HemisphericLight("sun", new BABYLON.Vector3(-1, 1, 0), scene);
    sun.diffuse = new BABYLON.Color3(1, 1, 1);
    sun.specular = new BABYLON.Color3(1, 1, 1);
    sun.groundColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    // Show a debug vector
    var defaultPoints =[new BABYLON.Vector3.Zero(), new BABYLON.Vector3.Zero()];
    var line = BABYLON.MeshBuilder.CreateLines("line", {points: defaultPoints}, scene);

    return scene;
};
/******* End of the create scene function ******/

// Moves line vertices to start and end
// line is a babylon mesh with 2 vertices
// start and end are babylon Vector3 objects
function updateLine(line, start, end) {
    var positions = line.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    
    positions[0] = start.x;
    positions[1] = start.y;
    positions[2] = start.z;

    positions[3] = end.x;
    positions[4] = end.y;
    positions[5] = end.z;
    
    line.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
}

// Call the createScene function
var scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        // Keep debug vector updated
        var bird = scene.getMeshesByID("bird")[0];
        var line = scene.getMeshesByID("line")[0];
        updateLine(line, bird.position, (bird.position.add(new BABYLON.Vector3(0, 0, 6))));

        // SHOW THE BIRB
        scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () { 
        engine.resize();
});
