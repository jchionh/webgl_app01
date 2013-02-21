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
    wa01.gPrevTimestamp = 0;
    wa01.gDelta = 0;

    // set our mainLoop to loop with requestAnimationFrame
    window.requestAnimationFrame(mainLoop);
}

function mainLoop(timestamp) {
    wa01.gDelta = timestamp - wa01.gPrevTimestamp;
    wa01.gPrevTimestamp = timestamp;
    wa01.gTitleElement.innerText = "d: " + wa01.gDelta;


    // at last, loop back main loop
    window.requestAnimationFrame(mainLoop);
}
