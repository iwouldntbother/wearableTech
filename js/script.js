// $("body").on("mousewheel", function() {
//     // console.log($(document).scrollTop())

//     if ($(document).scrollTop() < 300) {
//         console.log(300 / $(document).scrollTop())
//     } else {
//         return;
//     }
// })





// 
// THREE.JS
// 


// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// var mainCanvas = document.getElementById("mainCanvas")
// const renderer = new THREE.WebGLRenderer({canvas: mainCanvas, alpha: true});
// renderer.setSize( window.innerWidth, window.innerHeight );

// const controls = new THREE.OrbitControls( camera, renderer.domElement );
// camera.position.set( 0, 0.25, 0.5 );
// controls.enableZoom = false
// controls.autoRotate = true;
// controls.autoRotateSpeed = 4.0
// controls.update();


// // const light = new THREE.AmbientLight( 0x404040 );
// // scene.add( light );

// const directLight = new THREE.DirectionalLight();
// scene.add( directLight )

// const loader = new THREE.GLTFLoader();

// var model;
// loader.load(
//     "models/ThePearlWeb.glb",
    
//     function(gltf) {
//         scene.add(gltf.scene);
//         if (scene.getObjectByName("Sphere")) {
//             // console.log("Changing mat")
//             newMat = new THREE.MeshPhysicalMaterial( {
//                 color: 0xffffff,
//                 metalness: 0,
//                 roughness: 1,
//                 opacity: 0.9, 
//                 transparent: true,
//                 ior: 1,
//                 // side: THREE.DoubleSide
//             } );
//             scene.getObjectByName("Sphere").material = newMat;
//         }
//     },

//     function(xhr) {
//         // console.log((xhr.loaded / xhr.total * 100) + "% loaded");
//     },

//     function(error) {
//         console.log("An error has occured: " + error)
//     }
// )

// const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

// const bloomLayer = new THREE.Layers();
// bloomLayer.set( BLOOM_SCENE );

// const renderScene = new THREE.RenderPass( scene, camera );


// var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2.0, 0.1, 0.1);


// const bloomComposer = new THREE.EffectComposer( renderer );
// bloomComposer.renderToScreen = false;
// bloomComposer.addPass( renderScene );
// bloomComposer.addPass( bloomPass );

// const finalPass = new THREE.ShaderPass(
//     new THREE.ShaderMaterial( {
//         uniforms: {
//             baseTexture: { value: null },
//             bloomTexture: { value: bloomComposer.renderTarget2.texture }
//         },
//         // vertexShader: document.getElementById( 'vertexshader' ).textContent,
//         // fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
//         defines: {}
//     } ), "baseTexture"
// );
// finalPass.needsSwap = true;

// const finalComposer = new THREE.EffectComposer( renderer );
// finalComposer.addPass( renderScene );
// finalComposer.addPass( finalPass );



// function animate() {
// 	requestAnimationFrame( animate );

//     controls.update();

//     renderer.render( scene, camera );
    
//     finalComposer.render();
// }

// animate();



// 
// BABYLON JS
// 

const canvas = document.getElementById("mainCanvas")
const engine = new BABYLON.Engine(canvas, true);

function createScene() {

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.73, 0.89, 0.96);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 1, new BABYLON.Vector3(0, 0, 0), scene);
    camera.useAutoRotationBehavior = true;
    camera.autoRotationBehavior.idleRotationSpeed = 0.7;
    camera.minZ = 0.1;
    camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
    camera.attachControl(canvas, true);
    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    
    var gl = new BABYLON.GlowLayer("glow", scene);
    gl.intensity = 1.5;

    BABYLON.SceneLoader.ImportMesh("", "./models/", "scene (3).glb", scene, function(scene) {
        document.getElementById("fadeOutContainer").style.opacity = 0;
        setTimeout(function() {
            document.getElementById("fadeOutContainer").remove();
        }, 1000)
    })

    if (window.matchMedia("(max-width: 700px)").matches) {
        camera.detachControl()
    }

    return scene;

}

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});


// 
// Form
// 

let formContainer = document.getElementById("formContainer")
let form = document.getElementById("interestForm")
let name = document.getElementById("nameInput")
let email = document.getElementById("emailInput")
let comments = document.getElementById("commentsInput")

document.getElementById("formButton").addEventListener("click", function(){
    // console.log("Button Clicked!")
    if (name.value == "" || email.value == "") {
        document.getElementById("formError").innerHTML = "Required fields not filled"
    } else {
        form.remove();
        formContainer.innerHTML += "<h1>Thank you for registering<br>your interest!</h1>"
        // name.value = ""
        // email.value = ""
        // comments.value = ""
    }
    
})


// 
// Loading Terminal
// 

var typed = "";
var element = document.getElementById("terminalOutput")

function typeOut(textArray, arrayI, charI, speed) {
    
    if(arrayI == textArray.length) {
        document.getElementById("loadingPage").remove();
        return
    }

    text = textArray[arrayI][0];
    console.log(charI)

    if (charI == 0 && textArray[arrayI][1]) {
        element.innerHTML += "<p class=\"terminalTypeLine\"></p>"
    } else if (charI == 0 && !textArray[arrayI][1]) {
        element.innerHTML += "<p class=\"terminalResponseLine\">"+text+"</p>"
        setTimeout(function() {
            arrayI++;
            charI=0;
            typeOut(textArray, arrayI, charI, speed);
        }, 500)
        return
    }

    if (charI < text.length && arrayI < textArray.length) {
        element.lastChild.innerHTML += text.charAt(charI);
        // typed += text.charAt(charI);
        // element.innerHTML = typed;
        charI++;
        setTimeout(function() {
          typeOut(textArray, arrayI, charI, speed);
        }, speed);
    } else if (arrayI < textArray.length - 1) {
        console.log("done: "+arrayI)
        
        setTimeout(function() {
            typed = "";
            charI = 0;
            arrayI++;
            typeOut(textArray, arrayI, charI, speed);
        }, speed);
    }
}

var terminalArray = [
    ["sudo make pearl", true],
    ["Making Pearl - Done", false],
    ["Run \"./pearl.sh\"", false],
    ["sudo ./pearl.sh", true],
    ["Starting Pearl...", false],
    ["Done.", false],
    ["██████╗ ███████╗ █████╗ ██████╗ ██╗  ", false],
    ["██╔══██╗██╔════╝██╔══██╗██╔══██╗██║  ", false],
    ["██████╔╝█████╗  ███████║██████╔╝██║ ", false],
    ["██╔═══╝ ██╔══╝  ██╔══██║██╔══██╗██║  ", false],
    ["██║     ███████╗██║  ██║██║  ██║███████╗", false],
    ["╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝", false],
    ["Site successfully loaded!", false]
]

// typeOut(terminalArray, 0, 0, 100)

// let loadingDiv = document.getElementById("loadingPage").remove()



// setTimeout(function(){
//     loadingDiv.style.opacity = 0;
// }, 2000)