/**
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:36 PM
 */

// global WebGLRenderingContext gl
gl = null;

/**
 * init our app
 */
function mainInit() {
    // initing our app globals
    wa.gTitleElement = document.getElementsByTagName("title")[0];
    wa.gSysMessageElement = document.getElementById("sysMessageArea");
    wa.gPrevTimestamp = 0;
    wa.gDelta = 0;
    wa.gCanvasElement = document.getElementById('renderCanvas');
    wa.gCanvasContext = wa.gCanvasElement.getContext('webgl');

    // now, use khronos helper to test for webGL support and setup the gl context
    gl = WebGLUtils.setupWebGL(wa.gCanvasElement);
    if (!gl) {
        wa.gSysMessageElement.innerHTML = "Browser does not support WebGL";
        console.log("Browser does not support WebGL");
        return;
    } else {
        wa.gSysMessageElement.innerHTML = "WebGL initialized.";
        console.log("WebGL initialized.");
    }

    // create our cache libraries
    wa.gVtxLibrary = new wa.cache.QuadVertexBufferLibrary(gl);
    wa.gClrLibrary = new wa.cache.QuadVertexColorBufferLibrary(gl);
    wa.gTexCoordLibrary = new wa.cache.QuadTexCoordBufferLibrary(gl);
    wa.gTextureLibrary = new wa.cache.TextureLibrary(gl);

    // new our renderer
    wa.gRenderer = new wa.render.Renderer(gl);

    // init our renderer
    wa.gRenderer.initDefaultShaders(gl, "vtxShader", "fragShader");

    // new a furstrum viewpoint
    wa.gViewpoint = new wa.render.FrustumViewpoint(wa.gCanvasElement.width, wa.gCanvasElement.height);
    wa.gViewpoint.updateViewMatrix();
    wa.gViewpoint.updateProjMatrix();

    // int our rendere's view
    wa.gRenderer.initView();

    // set our viewpoint into the renderer
    wa.gRenderer.setViewpoint(gl, wa.gViewpoint);


    // init a scene for the renderer to render
    wa.gScene = new wa.render.Scene();
    // test a new scene node
    var root = wa.gScene.getRoot();

    var canvasWidth = wa.gCanvasElement.width * 1.0;
    var halfCanvasWidth = canvasWidth / 2.0;
    var canvasHeight = wa.gCanvasElement.height * 1.0;
    var halfCanvasHeight = canvasHeight / 2.0;

    // now init all our images in the imageList
    for (var i = 0; i < wa.data.ImageListURLs.length; ++i) {
        var imageEntity = new wa.entity.ImageEntity();
        // load images
        imageEntity.loadImageURL(wa.data.ImageListURLs[i]);

        // randomize positions
        imageEntity.position[v.X] = Math.floor(Math.random() * canvasWidth) - halfCanvasWidth;
        imageEntity.position[v.Y] = Math.floor(Math.random() * canvasHeight) - halfCanvasHeight;
        imageEntity.position[v.Z] = Math.floor(Math.random() * -200.0);
        imageEntity.rotationSpeed = Math.random() * 0.1;

        // add to our scene
        wa.utils.inList.addChild(root, imageEntity);
    }

    // call our mainloop the first time with a current timestamp
    mainLoop(new Date().getTime());
}

/**
 * this is our mainloop, that will be called with requestAnimationFrame
 * @param timestamp
 */
function mainLoop(timestamp) {
    // calculate our delta
    wa.gDelta = timestamp - wa.gPrevTimestamp;
    wa.gPrevTimestamp = timestamp;

    // just a test of updating the title so we know our mainloop is running
    wa.gTitleElement.innerHTML = wa.gDELTA_TEXT + wa.gDelta;
    // request animation for the next loop call
    // note: requestAnimFrame is a polyfill for cross browser
    // the actual function name is requestAnimationFrame
    window.requestAnimFrame(mainLoop, wa.gCanvasElement);

    // now perform our actions here
    wa.gRenderer.render(gl, wa.gScene);
}

