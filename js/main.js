/**
 * Created with JetBrains WebStorm.
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:36 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * init our app
 */
function mainInit() {
    wa01.gTitleElement = document.getElementsByTagName("title")[0];
    wa01.gSysMessageElement = document.getElementById("sysMessageArea");
    wa01.gPrevTimestamp = 0;
    wa01.gDelta = 0;
    wa01.gCanvasElement = document.getElementById('renderCanvas');
    wa01.gCanvasContext = wa01.gCanvasElement.getContext('webgl');
    gl = WebGLUtils.setupWebGL(wa01.gCanvasElement);
    if (!gl) {
        wa01.gSysMessageElement.innerText = "Browser does not support WebGL";
        return;
    } else {
        wa01.gSysMessageElement.innerText = "WebGL initialized.";
    }

    // call our mainloop the first time with a current timestamp
    mainLoop(new Date().getTime());
}

function mainLoop(timestamp) {
    // calculate our delta
    wa01.gDelta = timestamp - wa01.gPrevTimestamp;
    wa01.gPrevTimestamp = timestamp;
    wa01.gTitleElement.innerText = "d: " + wa01.gDelta;
    // request animation for the next loop call
    window.requestAnimationFrame(mainLoop, wa01.gCanvasElement);


    // now perform our actions


}
