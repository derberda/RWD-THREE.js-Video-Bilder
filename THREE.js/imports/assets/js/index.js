if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}
function init() {
    // var mixers = [];
    var renderer,
        scene,
        camera,
        myCanvas = document.getElementById('myCanvas'),
        stats;

    //RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: myCanvas,
        antialiasing: true,
        alpha: true
    });

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    window.addEventListener('resize', onWindowResize, false);

    //SCENE
    scene = new THREE.Scene();
    // console.log(scene);
    // console.log(camera);


    //CAMERA
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .01, 1000);
    camera.position.set(100, 0, -250);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('rgb(255,255,255)');
    document.getElementById('webgl').appendChild(renderer.domElement);

    // LIGHTS
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(- 50, 2.75, -210);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight2.color.setHSL(0.1, 1, 0.95);
    dirLight2.position.set(- 1, 2.75, 10);
    dirLight2.position.multiplyScalar(30);
    scene.add(dirLight2);


    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("./imports/assets/blenderObj/hand_low_poly_02.mtl", function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('./imports/assets/blenderObj/hand_low_poly_02.obj', function (mesh) {
            mesh.rotation.x = -Math.PI / 2;
            scene.add(mesh);

            var buttonBtn = mesh.children[5];
            var buttonLed = mesh.children[8];
            var buttonRasp = mesh.children[6];
            var buttonPowerbank = mesh.children[7];
            // console.log(mesh);
            // mesh.children[2].userData.uuid = "Sphere1Id";

            document.getElementById('webgl').appendChild(renderer.domElement);
            const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

            //Button
            domEvents.addEventListener(buttonBtn, 'click', event => {
                document.querySelector('#overlay').style.display = "block";
            });
            domEvents.addEventListener(buttonBtn, 'touchstart', event => {
                document.querySelector('#overlay').style.display = "block";
            });
            document.querySelector('#overlay').addEventListener("click", function () {
                document.querySelector('#overlay').style.display = "none";
            });
            document.querySelector('#overlay').addEventListener("touchend", function () {
                document.querySelector('#overlay').style.display = "none";
            });
            //LEDs
            domEvents.addEventListener(buttonLed, 'click', event => {
                document.querySelector('#overlay1').style.display = "block";
            });
            domEvents.addEventListener(buttonLed, 'touchstart', event => {
                document.querySelector('#overlay1').style.display = "block";
            });
            document.querySelector('#overlay1').addEventListener("click", function () {
                document.querySelector('#overlay1').style.display = "none";
            });
            document.querySelector('#overlay1').addEventListener("touchend", function () {
                document.querySelector('#overlay1').style.display = "none";
            });
            //Raspberry Pi
            domEvents.addEventListener(buttonRasp, 'click', event => {
                document.querySelector('#overlay2').style.display = "block";
            });
            domEvents.addEventListener(buttonRasp, 'touchstart', event => {
                document.querySelector('#overlay2').style.display = "block";
            });
            document.querySelector('#overlay2').addEventListener("click", function () {
                document.querySelector('#overlay2').style.display = "none";
            });
            document.querySelector('#overlay2').addEventListener("touchend", function () {
                document.querySelector('#overlay2').style.display = "none";
            });
            //Powerbank
            domEvents.addEventListener(buttonPowerbank, 'click', event => {
                document.querySelector('#overlay3').style.display = "block";
            });
            domEvents.addEventListener(buttonPowerbank, 'touchstart', event => {
                document.querySelector('#overlay3').style.display = "block";
            });
            document.querySelector('#overlay3').addEventListener("click", function () {
                document.querySelector('#overlay3').style.display = "none";
            });
            document.querySelector('#overlay3').addEventListener("touchend", function () {
                document.querySelector('#overlay3').style.display = "none";
            });
        });
    });

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    // //RENDER LOOP
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    update(renderer, scene, camera, controls);
    controls.minDistance = 6;
    controls.maxDistance = 6;

    return scene;
}

function update(renderer, scene, camera, controls) {
    renderer.render(
        scene,
        camera
    );

    controls.update();

    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    })
}

var scene = init(); 