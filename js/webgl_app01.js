/**
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:38 PM
 */

// create the app namepsace
var wa = wa || {};

// here are our globals
wa.gTitleElement = document.getElementsByTagName('title')[0];
//wa.gSysMessageElement = document.getElementById('sysMessageArea');
wa.gPrevTimestamp = 0;
wa.gDelta = 0;
wa.gTrackedInputArea = document.getElementById('renderArea');
wa.gCanvasElement = document.getElementById('renderCanvas');
wa.gCanvasContext = wa.gCanvasElement.getContext('webgl');
wa.gDELTA_TEXT = "d: ";
wa.gRenderer = null;
wa.gViewpoint = null;
wa.gScene = null;
wa.gVtxLibrary = null;
wa.gClrLibrary = null;
wa.gTexCoordLibrary = null;
wa.gTextureLibrary = null;
wa.gInputManager = null;
