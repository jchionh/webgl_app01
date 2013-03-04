/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 9:52 PM
 */
// namespace
wa.runstate = wa.runstate || {};

wa.runstate.StateRunner = function() {

    /**
     * this is our run stack;
     * @type {Array<wa.runstate.BaseRunState>}
     */
    this.stack = [];
};

wa.runstate.StateRunner.prototype.release = function() {

    var count = this.stack.length;
    // iterate and call release on all states in the stack
    for (var i = 0; i < count; ++i) {
        /**
         * @type {wa.runstate.BaseRunState}
         */
        var state = this.stack[i];
        state.onStop();
        // null it to remove reference
        this.stack[i] = null;
    }
    // now let's delete the stack
    // by setting the length to 0, it's crazy, i know! this is javascript!!! :)
    this.stack.length = 0;
};

/**
 * adding a state to the stack, here, we'll call onStart
 * @param {wa.runstate.BaseRunState} state
 */
wa.runstate.StateRunner.prototype.addState = function(state) {
    // push the game state onto the stack
    this.stack.push(state);
    // call the onStart of the state
    state.onStart();
};

/**
 * we remove the top state here
 */
wa.runstate.StateRunner.prototype.popState = function() {
    /**
     *
     * @type {wa.runstate.BaseRunState}
     */
    var state = this.stack.pop();
    if (state !== null) {
        state.onStop();
    }
};

/**
 * we call updates on all our states
 * @param {number} dt
 */
wa.runstate.StateRunner.prototype.update = function(dt) {

    var topIndex = this.stack.length - 1;

    // implement running the states from the top of the stack downwards
    // until it hits a state where the runflag is suspend lower, then it breaks
    for (var i = topIndex; i >= 0; --i) {
        /**
         *
         * @type {wa.runstate.BaseRunState}
         */
        var currentState = this.stack[i];
        currentState.onUpdate(dt);
        if (currentState.suspendLower() === true) {
            // if this state says not to run any lower states,
            // we'll break here.
            break;
        }
    }

    // now we check if any states has been set as exit is true, and release the states
    this.checkAndRemove();
};

/**
 * render our states
 * @param {number} dt
 * @param {Object} ctx
 */
wa.runstate.StateRunner.prototype.render = function(dt, ctx) {
    var topIndex = this.stack.length - 1;
    // implement running the states from the top of the stack downwards
    // until it hits a state where the runflag is suspend lower, then it breaks
    for (var i = topIndex; i >= 0; --i) {
        /**
         *
         * @type {wa.runstate.BaseRunState}
         */
        var currentState = this.stack[i];
        currentState.onRender(dt, ctx);
        if (currentState.suspendLower() === true) {
            // if this state says not to run any lower states,
            // we'll break here.
            break;
        }
    }
};

/**
 * now we check our states to see if the states have stopped, and remove them
 */
wa.runstate.StateRunner.prototype.checkAndRemove = function() {
    // now step through the stack again from bottom up to find the first state that
    // exited. if this state exited, we remove this state and all states above it
    var count = this.stack.length;
    var firstIndex = -1;
    for (var i = 0; i < count; ++i) {
        /**
         *
         * @type {wa.runstate.BaseRunState}
         */
        var currentState = this.stack[i];
        if (currentState.stopped === true) {
            // save out our first index
            firstIndex = i;
            // break from loop
            break;
        }
    }

    // then we resize the array
    if (firstIndex !== -1) {
        // now we need to loop from the top of the stack down to release
        // the states in the right order
        for (var i = count - 1; i >= firstIndex; --i) {
            /**
             *
             * @type {wa.runstate.BaseRunState}
             */
            var currentState = this.stack[i];
            currentState.onStop();
        }

        // now we need to remove the states
        this.stack.splice(firstIndex, count - firstIndex);
    }
};