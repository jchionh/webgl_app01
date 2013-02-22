/**
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:36 PM
 */

// global gl
var gl;

/**
 * init our app
 */
function mainInit() {
    // initing our app globals
    wa01.gTitleElement = document.getElementsByTagName("title")[0];
    wa01.gSysMessageElement = document.getElementById("sysMessageArea");
    wa01.gPrevTimestamp = 0;
    wa01.gDelta = 0;
    wa01.gCanvasElement = document.getElementById('renderCanvas');
    wa01.gCanvasContext = wa01.gCanvasElement.getContext('webgl');

    // now, use khronos helper to test for webGL support and setup the gl context
    gl = WebGLUtils.setupWebGL(wa01.gCanvasElement);
    if (!gl) {
        wa01.gSysMessageElement.innerText = "Browser does not support WebGL";
        return;
    } else {
        wa01.gSysMessageElement.innerText = "WebGL initialized.";
    }

    // new our renderer
    wa01.gRenderer = new wa01.render.Renderer(gl);

    // init our renderer
    wa01.gRenderer.initDefaultShaders("vtxShader", "fragShader");

    // call our mainloop the first time with a current timestamp
    mainLoop(new Date().getTime());
}

/**
 * this is our mainloop, that will be called with requestAnimationFrame
 * @param timestamp
 */
function mainLoop(timestamp) {
    // calculate our delta
    wa01.gDelta = timestamp - wa01.gPrevTimestamp;
    wa01.gPrevTimestamp = timestamp;

    // just a test of updating the title so we know our mainloop is running
    wa01.gTitleElement.innerText = wa01.gDELTA_TEXT + wa01.gDelta;
    // request animation for the next loop call
    window.requestAnimationFrame(mainLoop, wa01.gCanvasElement);


    // now perform our actions here

}

