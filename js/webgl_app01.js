/**
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:38 PM
 */

// create the app namepsace
var wa01 = wa01 || {};

// here are our globals
wa01.gTitleElement = document.getElementsByTagName("title")[0];
wa01.gSysMessageElement = document.getElementById("sysMessageArea");
wa01.gPrevTimestamp = 0;
wa01.gDelta = 0;
wa01.gCanvasElement = document.getElementById('renderCanvas');
wa01.gCanvasContext = wa01.gCanvasElement.getContext('webgl');
wa01.gDELTA_TEXT = "d: ";
wa01.gRenderer = null;
