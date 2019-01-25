function createGround(scene, size, numLines) {

    const ground = BABYLON.Mesh.CreatePlane("ground", size, scene);

    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(.4, .4, .7);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(0, 0, 0);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.9}, scene);

    //ground.checkCollisions = true;

    const boundaryNorth = BABYLON.MeshBuilder.CreatePlane(
        "boundaryNorth",
        {width: size, height: 20},
        scene);
    boundaryNorth.position = new BABYLON.Vector3(0, 10, size/2);
    boundaryNorth.visibility = 0.2;
    boundaryNorth.physicsImpostor = new BABYLON.PhysicsImpostor(
        boundaryNorth,
        BABYLON.PhysicsImpostor.BoxImpostor,
        {mass: 0, restitution: 0.9},
        scene);

    const boundarySouth = BABYLON.MeshBuilder.CreatePlane(
        "boundaryNorth",
        {width: size, height: 20},
        scene);
    boundarySouth.position = new BABYLON.Vector3(0, 10, size/2 * -1);
    boundarySouth.visibility = 0.2;
    boundarySouth.physicsImpostor = new BABYLON.PhysicsImpostor(
        boundarySouth,
        BABYLON.PhysicsImpostor.BoxImpostor,
        {mass: 0, restitution: 0.9},
        scene);

    const boundaryEast = BABYLON.MeshBuilder.CreatePlane(
        "boundaryEast",
        {width: size, height: 20},
        scene);
    boundaryEast.position = new BABYLON.Vector3(size/2 * -1, 10, 0);
    boundaryEast.rotate(BABYLON.Axis.Y, 3 * Math.PI/2, BABYLON.Space.WORLD);
    boundaryEast.visibility = 0.2;
    boundaryEast.physicsImpostor = new BABYLON.PhysicsImpostor(
        boundaryEast,
        BABYLON.PhysicsImpostor.BoxImpostor,
        {mass: 0, restitution: 0.9},
        scene);

    const boundaryWest = BABYLON.MeshBuilder.CreatePlane(
        "boundaryWest",
        {width: size, height: 20},
        scene);
    boundaryWest.position = new BABYLON.Vector3(size/2, 10, 0);
    boundaryWest.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
    boundaryWest.visibility = 0.2;
    boundaryWest.physicsImpostor = new BABYLON.PhysicsImpostor(
        boundaryWest,
        BABYLON.PhysicsImpostor.BoxImpostor,
        {mass: 0, restitution: 0.9},
        scene);

    const margin = size / numLines;
    let xpos = size / -2;
    const lineMaterial = new BABYLON.StandardMaterial("lineMaterial", scene);
    lineMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    let lines = [];

    for(let i = 0; i <= numLines ; i++){
        const linePlane = BABYLON.MeshBuilder.CreatePlane(
            "linePlane",
            {width: .15, height: size},
            scene);
        linePlane.position = new BABYLON.Vector3(xpos, .1, 0);
        linePlane.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
        linePlane.material = lineMaterial;
        lines.push(linePlane);
        xpos += margin;
    }

    const groundObj = {ground, lines};

    return groundObj;
}