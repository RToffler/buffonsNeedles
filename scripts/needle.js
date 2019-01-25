function createNeedle(scene, position, rotation, size) {

    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseTexture = new BABYLON.Texture("resources/texturepack.jpg", scene);
    material.diffuseTexture.uScale = 3;
    material.diffuseTexture.vScale = 5;

    let needle = BABYLON.SceneLoader.ImportMesh("", "", "resources/needle.babylon", scene,
        function (newMeshes) {
            let needle = newMeshes[0];
            needle.material = material;
            needle.physicsImpostor = new BABYLON.PhysicsImpostor(
                needle,
                BABYLON.PhysicsImpostor.BoxImpostor, {
                    mass: 15,
                    friction: 1,
                    restitution: .6,
                }, scene
            );
            needle.position = position;
            needle.rotation = rotation;
            needle.scaling.y = size/2;
        }
    );

    return needle;
}