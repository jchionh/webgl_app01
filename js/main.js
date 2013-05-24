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
    wa.gTitleElement = document.getElementsByTagName('title')[0];
    //wa.gSysMessageElement = document.getElementById('sysMessageArea');
    wa.gPrevTimestamp = 0;
    wa.gDelta = 0;
    wa.gTrackedInputArea = document.getElementById('renderArea');
    wa.gCanvasElement = document.getElementById('renderCanvas');
    wa.gSelectState = document.getElementById('StateSelect');
    wa.gMsgArea = document.getElementById('msgArea');

    wa.gDevicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
    wa.gCanvasElement.width = wa.gCanvasElement.clientWidth * wa.gDevicePixelRatio;
    wa.gCanvasElement.height = wa.gCanvasElement.clientHeight * wa.gDevicePixelRatio;
    console.log('devicePixelRatio: ' + wa.gDevicePixelRatio);

    wa.gCanvasContext = wa.gCanvasElement.getContext('webgl');

    // now, use khronos helper to test for webGL support and setup the gl context
    gl = WebGLUtils.setupWebGL(wa.gCanvasElement);
    if (!gl) {
        //wa.gSysMessageElement.innerHTML = "Browser does not support WebGL";
        console.log("Browser does not support WebGL");
        return;
    } else {
        //wa.gSysMessageElement.innerHTML = "WebGL initialized.";
        console.log("WebGL initialized.");
    }

    // create our cache libraries
    wa.gVtxLibrary = new wa.cache.QuadVertexBufferLibrary(gl);
    wa.gClrLibrary = new wa.cache.QuadVertexColorBufferLibrary(gl);
    wa.gTexCoordLibrary = new wa.cache.QuadTexCoordBufferLibrary(gl);
    wa.gTextureLibrary = new wa.cache.TextureLibrary(gl);

    // new our input manager
    // REMEMBER TO RELEASE?
    wa.gInputManager = new wa.input.InputManager(wa.gTrackedInputArea);

    // new our renderer
    wa.gRenderer = new wa.render.Renderer(gl);

    // init our renderer
    wa.gRenderer.initDefaultShaders(gl, "vtxShader", "fragShader");

    // new our state runner
    wa.gStateRunner = new wa.runstate.StateRunner();

    // add a initial state to our state runner
    /**
     *
     * @type {wa.runstate.BaseRunState}
     */
    var initialRunState = new wa.states.InitialState();
    wa.gStateRunner.addState(initialRunState);

    // new a furstrum viewpoint
    wa.gViewpoint = new wa.render.FrustumViewpoint(wa.gCanvasElement.width, wa.gCanvasElement.height);
    wa.gViewpoint.updateViewMatrix();
    wa.gViewpoint.updateProjMatrix();

    // int our rendere's view
    wa.gRenderer.initView();

    // set our viewpoint into the renderer
    wa.gRenderer.setViewpoint(gl, wa.gViewpoint);

    // add a floaty images state
    wa.gStateRunner.addState(new wa.states.FloatyImages());

    // call our mainloop the first time with a current timestamp
    mainLoop(new Date().getTime());
}


/**
 * turn vignette on or off
 */
function vignetteOnOff() {
    var doVignette = document.getElementById("doVignette").checked;
    document.getElementById("doVignetteText").innerText = doVignette ? "On" : "Off";
    wa.entity.ImageEntityGlobals.doVignette = doVignette;
}

/**
 * update the state of the slider
 * @param {String} name
 */
function sliderChanged(name) {
    var value = document.getElementById(name).value;
    document.getElementById(name + "Text").innerText = "" + value;
    wa.entity.ImageEntityGlobals[name] = value;
}

function defaultVignetteValues() {
    var name = "vigOuterBorder";
    document.getElementById(name).value = 1.3;
    document.getElementById(name + "Text").innerText = "1.3";
    wa.entity.ImageEntityGlobals[name] = 1.3;

    name = "vigFade";
    document.getElementById(name).value = 22;
    document.getElementById(name + "Text").innerText = "22";
    wa.entity.ImageEntityGlobals[name] = 22;

    name = "fStop";
    document.getElementById(name).value = 0.9;
    document.getElementById(name + "Text").innerText = "0.9";
    wa.entity.ImageEntityGlobals[name] = 0.9;
}


/**
 * this is our mainloop, that will be called with requestAnimationFrame
 * @param {number} timestamp
 */
function mainLoop(timestamp) {
    // calculate our delta
    wa.gDelta = timestamp - wa.gPrevTimestamp;
    wa.gPrevTimestamp = timestamp;

    // just a test of updating the title so we know our mainloop is running
    wa.gTitleElement.innerHTML = wa.gDelta;
    // request animation for the next loop call
    // note: requestAnimFrame is a polyfill for cross browser
    // the actual function name is requestAnimationFrame
    window.requestAnimFrame(mainLoop, wa.gCanvasElement);

    // perform state updates
    wa.gStateRunner.update(wa.gDelta);

    // then perform state renders
    wa.gStateRunner.render(wa.gDelta, gl);

    // clear input states
    wa.gInputManager.clearStates();
}

function switchState() {
    var selectedState = wa.gSelectState.value;
    //console.log('value: ' + selectedState);
    if (wa.gStateRunner !== null) {
        switch (selectedState) {
            case 'FloatyImages':
                wa.gStateRunner.switchState(new wa.states.FloatyImages());
                wa.gMsgArea.innerHTML = '[' + selectedState + ']';
                break;

            case 'SpinningImages':
                wa.gStateRunner.switchState(new wa.states.SpinningImages());
                wa.gMsgArea.innerHTML = '[' + selectedState + ']';
                break;

            default:
                var msg = 'state: [' + selectedState + '] not implemented yet.';
                console.log(msg);
                wa.gMsgArea.innerHTML = msg;
                break;
        }
    }
}

