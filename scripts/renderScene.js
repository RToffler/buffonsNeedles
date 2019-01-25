
const spawnNeedles = function(scene, number, size, gapSize){
    let needles = [];
    for(let i = 0; i < number; i++){
        const positionVector = new BABYLON.Vector3(
            (-1 * size/2 + 5) + Math.floor(Math.random()*(size-10)),
            15,
            (-1 * size/2 + 5) + Math.floor(Math.random()*(size-10)));
        const rotationVector = new BABYLON.Vector3(
            Math.random()*Math.PI * 2,
            Math.random()*Math.PI * 2,
            0
        );
        needles.push(createNeedle(scene, positionVector, rotationVector, gapSize/2));
    }
    return needles;
}

const startScene = function(){
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    const createScene = function () {

        const size = 30;
        const numberOfNeedles = 100;

        // Create the scene space
        let scene = new BABYLON.Scene(engine);
        engine.enableOfflineSupport = false;
        // Add a camera to the scene and attach it to the canvas
        let camera = new BABYLON.UniversalCamera("Camera",new BABYLON.Vector3(0, 20, -25), scene);
        camera.speed = .5;
        camera.rotate = new BABYLON.Vector3(Math.PI/8, 0, 0)
        camera.attachControl(canvas, true);

        camera.setTarget(new BABYLON.Vector3(0, 0, -5));

        let gravityVector = new BABYLON.Vector3(0, -9.81, 0);
        const physicsPlugin = new BABYLON.CannonJSPlugin();
        scene.enablePhysics(gravityVector, physicsPlugin);
        scene.collisionsEnabled = true;

        // Add lights to the scene
        const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
        light2.intensity = .5;

        // Add and manipulate meshes in the scene
        const ground = createGround(scene, size, 10);

        let needles = spawnNeedles(scene, numberOfNeedles, size, .5);

        //let needle1 = createNeedle(scene, new BABYLON.Vector3(1, 15, 0), new BABYLON.Vector3(1, 0, 0));

        //Use toString to prevent object reference assignment.
        let lastPos = camera.position.toString();
        scene.registerBeforeRender(function(){
            if(camera.position.toString() !== lastPos) {
                console.log(camera.position);
                lastPos = camera.position.toString();
            }
        });

        return scene;
    };
    /******* End of the create scene function ******/

    let scene = createScene(); //Call the createScene function

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
}