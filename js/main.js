/**
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:36 PM
 */

// global WebGLRenderingContext gl
var gl;

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

    // new our renderer
    wa.gRenderer = new wa.render.Renderer(gl);

    // init our renderer
    wa.gRenderer.initDefaultShaders(gl, "vtxShader", "fragShader");

    // int our rendere's view
    wa.gRenderer.initView();

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
    wa.gRenderer.render(gl);
}

