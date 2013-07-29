/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 10:31 PM
 */
// namespace
wa.states = wa.states || {};

/**
 *
 * // loads up images and displays them in 3D space
 *
 * @constructor
 * @extends wa.runstate.GLRunState
 */
wa.states.StaticImages = function() {
    // call the super class init
    wa.runstate.GLRunState.call(this, wa.runstate.RunFlag.SUSPEND_LOWER);
    this.scene = new wa.render.Scene();
    /**
     *
     * @type {Array<wa.entity.ImageEntity>}
     */
    this.imageEntities = [];
};

// extend from GLRunState
wa.utils.extend(wa.states.StaticImages, wa.runstate.GLRunState);


/**
 * onstart
 * @override
 */
wa.states.StaticImages.prototype.onStart = function() {
    console.log('StaticImages::onStart');
    var root = this.scene.getRoot();

    var canvasWidth = wa.gCanvasElement.clientWidth;
    var halfCanvasWidth = canvasWidth / 2.0;
    var canvasHeight = wa.gCanvasElement.clientHeight;
    var halfCanvasHeight = canvasHeight / 2.0;

    // create our image entities
    this.imageEntities = wa.entity.createImageEntityArray(wa.data.ImageListURLs);

    // now init all our images to positions, and add to our scene
    for (var i = 0; i < this.imageEntities.length; ++i) {
        var imageEntity = this.imageEntities[i];
        // randomize positions
        imageEntity.position[v.X] = Math.floor(Math.random() * canvasWidth) - halfCanvasWidth;
        imageEntity.position[v.Y] = Math.floor(Math.random() * canvasHeight) - halfCanvasHeight;
        imageEntity.position[v.Z] = Math.floor(Math.random() * -1000.0);
        imageEntity.rotationSpeed = Math.random() * 0.003;
        imageEntity.translateSpeed = Math.random() * 5.0;

        // add to our scene
        wa.utils.inList.addChild(root, imageEntity);
    }
};

/**
 * onstop
 * @override
 */
wa.states.StaticImages.prototype.onStop = function() {
    // cleanup
    var count = this.imageEntities.length;
    for (var i = 0; i < count; ++i) {
        this.imageEntities[i].release();
        this.imageEntities[i] = null;
    }
    // clear the array
    this.imageEntities.length = 0;
    this.imageEntities = null;

    // release our scene
    this.scene.release();
    this.scene = null;
    console.log('StaticImages::onStop');
};

/**
 * update
 * @override
 * @param {number} dt
 */
wa.states.StaticImages.prototype.onUpdate = function(dt) {
    //console.log('StaticImages::onUpdate');
};

/**
 * @override
 * @param {number} dt
 * @param {WebGLRenderingContext} gl
 */
wa.states.StaticImages.prototype.onRender = function(dt, gl) {
    //console.log('StaticImages::onRender');
    wa.gRenderer.render(gl, this.scene);
};

