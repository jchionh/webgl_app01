/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 10:19 PM
 */
// namesapce
wa.runstate = wa.runstate || {};
wa.runstate.states = wa.runstate.states || {};

/**
 * initial run state in the stack, does nothing
 * @constructor
 * @extends wa.runstate.GLRunState
 */
wa.runstate.states.InitialState = function() {
    // call the super class init
    wa.runstate.GLRunState.call(this, wa.runstate.RunFlag.SUSPEND_LOWER);
};

// extend from GLRunState
wa.utils.extend(wa.runstate.states.InitialState, wa.runstate.GLRunState);

/**
 * onstart
 */
wa.runstate.states.InitialState.prototype.onStart = function() {
    console.log('InitialSate::onStart');
};

/**
 * onstop
 */
wa.runstate.states.InitialState.prototype.onStop = function() {
    console.log('InitialSate::onStop');
};